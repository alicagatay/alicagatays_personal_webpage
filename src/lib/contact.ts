'use server'

import { Resend } from 'resend'
import { enquiryRateLimitOk } from '@/lib/rate-limit'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

// The set of reasons offered in the form's dropdown. Validated server-side so a
// tampered payload can't slip an arbitrary value into the subject line.
let allowedReasons = ['Project', 'Collaboration', 'Hiring', 'Other']

// Where enquiries land. Already public on the page as the "Email" link.
let contactEmail = 'aliccagatay@gmail.com'

function field(formData: FormData, name: string) {
  let value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: 'error',
      message: 'That email address does not look right - mind checking it?',
    }
  }

  // Throttle before doing any real work, so a flood can't bury the inbox or
  // exhaust the Resend quota.
  if (!(await enquiryRateLimitOk())) {
    return {
      status: 'error',
      message: `You have sent a few enquiries already - please give it a little while, or email me directly at ${contactEmail}.`,
    }
  }

  let apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('Enquiry not sent: RESEND_API_KEY is not set.')
    return {
      status: 'error',
      message: `Something went wrong on my end. Please email me directly at ${contactEmail}.`,
    }
  }

  let resend = new Resend(apiKey)

  let text = [
    'New enquiry from your website.',
    '',
    `Name:   ${firstName} ${lastName}`,
    `Email:  ${email}`,
    `Reason: ${reason}`,
    '',
    'Message:',
    message,
  ].join('\n')

  try {
    let { error } = await resend.emails.send({
      from: 'Ali Cagatay Website <hello@alicagatay.xyz>',
      to: contactEmail,
      replyTo: email,
      subject: `New enquiry (${reason}) - ${firstName} ${lastName}`,
      text,
    })

    if (error) {
      console.error('Enquiry not sent: Resend returned an error.', error)
      return {
        status: 'error',
        message:
          'Your message could not be sent just then. Please try again, or email me directly.',
      }
    }

    return { status: 'success' }
  } catch (err) {
    console.error('Enquiry not sent: unexpected error.', err)
    return {
      status: 'error',
      message:
        'Your message could not be sent just then. Please try again, or email me directly.',
    }
  }
}
