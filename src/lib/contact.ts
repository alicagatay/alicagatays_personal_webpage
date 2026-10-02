'use server'

// Every export here is a public endpoint: Next turns each one into an action
// anyone can POST to with any payload. So this file exports only the three
// actions, checks every argument, and keeps the helpers (above all the pass
// check) in plain server modules.

import { Resend } from 'resend'
import { contactEmail } from '@/lib/email'
import {
  VerificationUnavailable,
  assertVerificationAvailable,
  canonicalEmail,
  checkCode,
  claimPass,
  decoyChallenge,
  deleteCode,
  domainAcceptsMail,
  issueCode,
  issuePass,
  mailboxId,
  restorePass,
  type CodeCheck,
} from '@/lib/email-verification'
import {
  codeCheckOk,
  codeSendGlobalOk,
  codeSendOk,
  enquiryRateLimitOk,
  isLocalDev,
} from '@/lib/rate-limit'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  // The verified pass was missing, used or expired: the form should drop its
  // verified state so the visitor verifies again.
  reverify?: boolean
}

export type VerificationState = {
  status: 'sent' | 'verified' | 'error'
  message?: string
  challenge?: string
  token?: string
}

// The set of reasons offered in the form's dropdown. Validated server-side so a
// tampered payload can't slip an arbitrary value into the subject line.
let allowedReasons = ['Project', 'Collaboration', 'Hiring', 'Other']

let fromAddress = 'Ali Cagatay Website <hello@alicagatay.xyz>'

let unavailableMessage = `Something went wrong on my end. Please email me directly at ${contactEmail}.`
let badEmailMessage =
  'That email address does not look right - mind checking it?'
let codeFormatMessage = 'Please enter the 6-digit code from the email.'

let codeMessages: Record<Exclude<CodeCheck, 'ok'>, string> = {
  wrong: 'That code doesn’t match - mind checking it?',
  expired: 'That code has expired. Press Resend code for a new one.',
  locked: 'Too many tries with that code. Press Resend code for a new one.',
}

function field(formData: FormData, name: string) {
  let value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

type Outgoing = {
  to: string
  subject: string
  text: string
  replyTo?: string
  category: string
}

// Sends one plain-text email through Resend. In local `next dev` without a
// Resend key it prints the email to the server console instead, so the whole
// form can be tried end to end; anywhere else a missing key is an error.
async function sendEmail(
  email: Outgoing,
): Promise<'sent' | 'unconfigured' | 'failed'> {
  let apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    if (isLocalDev) {
      console.info(
        `[dev] RESEND_API_KEY is unset, so this email was printed instead of sent.\nTo: ${email.to}\nSubject: ${email.subject}\n\n${email.text}`,
      )
      return 'sent'
    }
    console.error(
      `Email not sent (${email.category}): RESEND_API_KEY is not set.`,
    )
    return 'unconfigured'
  }

  try {
    let { error } = await new Resend(apiKey).emails.send({
      from: fromAddress,
      to: email.to,
      replyTo: email.replyTo,
      subject: email.subject,
      text: email.text,
      tags: [{ name: 'category', value: email.category }],
    })
    if (error) {
      console.error(
        `Email not sent (${email.category}): Resend returned an error.`,
        error,
      )
      return 'failed'
    }
    return 'sent'
  } catch (err) {
    console.error(`Email not sent (${email.category}): unexpected error.`, err)
    return 'failed'
  }
}

// Step 1 of verification: email a 6-digit code to the address. Returns the
// challenge the browser must send back with the code.
export async function requestVerificationCode(
  email: unknown,
  company: unknown,
): Promise<VerificationState> {
  // Honeypot (see submitEnquiry): look successful to a bot, send nothing.
  if (typeof company !== 'string' || company.trim()) {
    return { status: 'sent', challenge: decoyChallenge() }
  }

  let canon = canonicalEmail(email)
  if (!canon) return { status: 'error', message: badEmailMessage }

  try {
    assertVerificationAvailable()

    if (!(await codeSendOk(mailboxId(canon)))) {
      return {
        status: 'error',
        message: `You’ve asked for a few codes already - please give it a little while, or email me directly at ${contactEmail}.`,
      }
    }
    if (!(await domainAcceptsMail(canon))) {
      return { status: 'error', message: badEmailMessage }
    }
    if (!(await codeSendGlobalOk())) {
      return {
        status: 'error',
        message: `I can’t send any more codes right now - please try again later, or email me directly at ${contactEmail}.`,
      }
    }

    let { code, challenge } = await issueCode(canon)

    // Nothing the visitor typed goes into this email beyond the address
    // itself, so it can't be used to carry anyone else's text.
    let result = await sendEmail({
      to: canon,
      subject: `${code} is your code for alicagatay.xyz`,
      text: [
        'Your code to verify your email address on alicagatay.xyz is:',
        '',
        code,
        '',
        'It expires in 10 minutes.',
        '',
        'If you did not ask for this, you can ignore this email.',
      ].join('\n'),
      category: 'email-verification',
    })

    if (result !== 'sent') {
      await deleteCode(canon)
      return {
        status: 'error',
        message:
          result === 'unconfigured'
            ? unavailableMessage
            : `I couldn’t send the code just then. Please try again, or email me directly at ${contactEmail}.`,
      }
    }

    return { status: 'sent', challenge }
  } catch (err) {
    if (err instanceof VerificationUnavailable) {
      return { status: 'error', message: unavailableMessage }
    }
    throw err
  }
}

// Step 2: check the code. On success, returns the single-use pass token the
// form sends along with the enquiry.
export async function confirmVerificationCode(
  email: unknown,
  challenge: unknown,
  code: unknown,
): Promise<VerificationState> {
  if (typeof code !== 'string' || code.length > 20) {
    return { status: 'error', message: codeFormatMessage }
  }
  let digits = code.replace(/\s/g, '')
  if (!/^\d{6}$/.test(digits)) {
    return { status: 'error', message: codeFormatMessage }
  }
  if (typeof challenge !== 'string' || !/^[A-Za-z0-9_-]{22}$/.test(challenge)) {
    return { status: 'error', message: codeMessages.expired }
  }

  let canon = canonicalEmail(email)
  if (!canon) return { status: 'error', message: badEmailMessage }

  try {
    assertVerificationAvailable()

    if (!(await codeCheckOk())) {
      return {
        status: 'error',
        message:
          'Too many tries - please give it a little while and try again.',
      }
    }

    let result = await checkCode(canon, challenge, digits)
    if (result !== 'ok') {
      return { status: 'error', message: codeMessages[result] }
    }

    return { status: 'verified', token: await issuePass(canon) }
  } catch (err) {
    if (err instanceof VerificationUnavailable) {
      return { status: 'error', message: unavailableMessage }
    }
    throw err
  }
}

export async function submitEnquiry(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a hidden field real visitors never see or fill. If it has a
  // value, a bot submitted the form - quietly report success so it doesn't
  // learn to try again, and send nothing.
  if (field(formData, 'company')) {
    return { status: 'success' }
  }

  let firstName = field(formData, 'firstName')
  let lastName = field(formData, 'lastName')
  let email = field(formData, 'email')
  let reason = field(formData, 'reason')
  let message = field(formData, 'message')
  let token = field(formData, 'verificationToken')

  if (!firstName || !lastName || !email || !reason || !message) {
    return {
      status: 'error',
      message: 'Please fill in every field before sending.',
    }
  }

  if (!allowedReasons.includes(reason)) {
    return {
      status: 'error',
      message: 'Please pick a reason for your enquiry.',
    }
  }

  // The client sets maxLength, but that's only a browser hint - a direct POST
  // bypasses it. Enforce the same caps server-side so payloads stay bounded.
  if (
    firstName.length > 80 ||
    lastName.length > 80 ||
    email.length > 160 ||
    message.length > 4000
  ) {
    return {
      status: 'error',
      message: 'That submission looks too long - please shorten it.',
    }
  }

  let canon = canonicalEmail(email)
  if (!canon) return { status: 'error', message: badEmailMessage }

  // Only a visitor who proved they can read this inbox gets past here. The
  // pass is claimed (deleted) now and put back if the send then fails.
  try {
    if (!(await claimPass(token, canon))) {
      return {
        status: 'error',
        reverify: true,
        message: 'Please verify your email address before sending.',
      }
    }
  } catch (err) {
    if (err instanceof VerificationUnavailable) {
      return { status: 'error', message: unavailableMessage }
    }
    throw err
  }

  // Throttle before doing any real work, so a flood can't bury the inbox or
  // exhaust the Resend quota.
  if (!(await enquiryRateLimitOk())) {
    await restorePass(token, canon)
    return {
      status: 'error',
      message: `You have sent a few enquiries already - please give it a little while, or email me directly at ${contactEmail}.`,
    }
  }

  let result = await sendEmail({
    to: contactEmail,
    replyTo: canon,
    subject: `New enquiry (${reason}) - ${firstName} ${lastName}`,
    text: [
      'New enquiry from your website.',
      '',
      `Name:   ${firstName} ${lastName}`,
      `Email:  ${canon} (verified)`,
      `Reason: ${reason}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    category: 'enquiry',
  })

  if (result !== 'sent') {
    await restorePass(token, canon)
    return {
      status: 'error',
      message:
        result === 'unconfigured'
          ? unavailableMessage
          : 'Your message could not be sent just then. Please try again, or email me directly.',
    }
  }

  return { status: 'success' }
}
