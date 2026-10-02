'use client'

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { flushSync } from 'react-dom'
import clsx from 'clsx'
import {
  confirmVerificationCode,
  requestVerificationCode,
  submitEnquiry,
  type ContactState,
} from '@/lib/contact'
import { contactEmail, maxEmailLength, normalizeEmail } from '@/lib/email'

let initialState: ContactState = { status: 'idle' }

let labelClass =
  'mb-1.5 block text-xs uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400'

let fieldClass =
  'w-full border-b border-zinc-300 bg-transparent py-1.5 text-zinc-900 transition placeholder:text-zinc-600 focus:border-teal-700 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:border-teal-400'

// The native <select>'s open option menu inherits the control's background; an
// explicit one keeps it readable in dark mode on platforms that don't theme it.
let selectClass = fieldClass.replace('bg-transparent', 'bg-paper dark:bg-ink')

// An input sharing its underline with an inline text button (Verify, Confirm):
// the row draws the line, so it lights up while either one has focus.
let underlineRow =
  'flex items-baseline gap-3 border-b border-zinc-300 transition focus-within:border-teal-700 dark:border-zinc-700 dark:focus-within:border-teal-400'

let rowFieldClass =
  'min-w-0 flex-1 bg-transparent py-1.5 text-zinc-900 placeholder:text-zinc-600 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-400'

let textButton =
  'text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 hover:decoration-teal-700 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-teal-400 dark:hover:decoration-teal-400'

let rowButton = 'shrink-0 whitespace-nowrap tabular-nums'

// A row button that can't be pressed right now (sending, or the resend
// countdown): same text, no underline or hover, so it doesn't look clickable.
let rowButtonResting = 'cursor-default text-sm text-zinc-600 dark:text-zinc-400'

let resetLink = `mt-3 ${textButton}`

let hintClass = 'text-sm text-zinc-600 dark:text-zinc-400'

let sendButton =
  'inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-paper dark:focus:ring-offset-ink'

let sendReady = 'bg-teal-700 text-white shadow-sm hover:bg-teal-800'

// Greyed out until the email is verified, but still at least 4.5:1 so the
// label stays readable.
let sendWaiting =
  'cursor-not-allowed bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'

let refreshMessage = `Something went wrong - please refresh the page and try again, or email me directly at ${contactEmail}.`

// The address a code was sent to (or that was verified), with the challenge
// to send back with the code and, once confirmed, the single-use pass token.
type Verification = { email: string; challenge: string; token: string }
type VerifyError = { field: 'email' | 'code'; message: string }

let notVerified: Verification = { email: '', challenge: '', token: '' }

// The in-page enquiry form. Posts to the submitEnquiry Server Action, which
// emails the message on; here we collect input and reflect the result. The
// `formKey` remount gives us a clean reset for a follow-up enquiry, since
// useActionState has no built-in reset.
export function ContactForm() {
  let [formKey, setFormKey] = useState(0)
  return (
    <EnquiryForm key={formKey} onReset={() => setFormKey((key) => key + 1)} />
  )
}

function EnquiryForm({ onReset }: { onReset: () => void }) {
  let [email, setEmail] = useState('')
  let [code, setCode] = useState('')
  let [verification, setVerification] = useState(notVerified)
  let [busy, setBusy] = useState<'idle' | 'sending' | 'checking'>('idle')
  let [verifyError, setVerifyError] = useState<VerifyError | null>(null)
  // The resend countdown keeps a deadline rather than counting ticks, because
  // phones pause timers while the visitor is off checking their mail app.
  let [resendAt, setResendAt] = useState(0)
  let [now, setNow] = useState(0)

  let emailRef = useRef<HTMLInputElement>(null)
  let honeypotRef = useRef<HTMLInputElement>(null)
  let codeRef = useRef<HTMLInputElement>(null)
  let verifyButtonRef = useRef<HTMLButtonElement>(null)
  let verifiedRef = useRef<HTMLSpanElement>(null)
  let confirmationRef = useRef<HTMLParagraphElement>(null)

  // Wraps submitEnquiry so a missing or used-up pass sends the visitor back to
  // verifying (keeping everything they typed), and a thrown error - say, the
  // page predates a deploy - still ends in a readable message.
  async function sendEnquiry(
    previous: ContactState,
    formData: FormData,
  ): Promise<ContactState> {
    try {
      let result = await submitEnquiry(previous, formData)
      if (result.reverify) {
        setVerification(notVerified)
        setVerifyError({
          field: 'email',
          message: result.message ?? refreshMessage,
        })
        return initialState
      }
      return result
    } catch {
      return { status: 'error', message: refreshMessage }
    }
  }

  let [state, formAction, pending] = useActionState(sendEnquiry, initialState)

  // Derived rather than stored, so editing the email un-verifies it on its
  // own, and replies for an address the visitor has since changed are ignored.
  let isCurrent =
    verification.email !== '' && verification.email === normalizeEmail(email)
  let verified = isCurrent && verification.token !== ''
  let codeSent = isCurrent && verification.challenge !== '' && !verified
  let cooldown = Math.max(0, Math.ceil((resendAt - now) / 1000))
  let coolingDown = codeSent && cooldown > 0

  // Re-reads the clock about once a second until the deadline passes. After a
  // phone resumes the page, the overdue timer fires at once and the label
  // jumps to the real time left.
  useEffect(() => {
    if (now >= resendAt) return
    let timer = setTimeout(() => setNow(Date.now()), 1000)
    return () => clearTimeout(timer)
  }, [now, resendAt])

  useEffect(() => {
    if (state.status === 'success') {
      // Move focus onto the confirmation so the form (and the button that was
      // just activated, now unmounted) doesn't drop keyboard/SR users to <body>.
      confirmationRef.current?.focus()
    }
  }, [state.status])

  // The email as it is in the field right now (not as of the last render), to
  // tell whether a reply still applies once it comes back.
  function liveEmail() {
    return normalizeEmail(emailRef.current?.value ?? '')
  }

  async function sendCode() {
    if (busy !== 'idle' || coolingDown) return
    let input = emailRef.current
    if (!input?.reportValidity()) return

    // Read the field itself, not state: a browser can restore a typed address
    // into the field (after a reload, or a phone reviving a discarded tab)
    // without React seeing it. Syncing it into state in this same batch also
    // stops the re-render below from blanking the field.
    let raw = input.value
    if (raw !== email) setEmail(raw)
    let target = normalizeEmail(raw)
    setVerifyError(null)
    setBusy('sending')
    try {
      let result = await requestVerificationCode(
        raw,
        honeypotRef.current?.value ?? '',
      )
      if (liveEmail() !== target) return
      let challenge = result.challenge
      if (result.status === 'sent' && challenge) {
        // Render the code field now, so focus can move straight into it.
        let sentAt = Date.now()
        flushSync(() => {
          setVerification({ email: target, challenge, token: '' })
          setCode('')
          setNow(sentAt)
          setResendAt(sentAt + 60_000)
        })
        codeRef.current?.focus()
      } else {
        setVerifyError({
          field: 'email',
          message: result.message ?? refreshMessage,
        })
      }
    } catch {
      setVerifyError({ field: 'email', message: refreshMessage })
    } finally {
      setBusy('idle')
    }
  }

  async function confirmCode() {
    if (busy !== 'idle' || !codeSent) return
    if (!/^\d{6}$/.test(code)) {
      setVerifyError({
        field: 'code',
        message: 'Please enter the 6-digit code from the email.',
      })
      codeRef.current?.focus()
      return
    }

    let target = verification
    setVerifyError(null)
    setBusy('checking')
    try {
      let result = await confirmVerificationCode(
        target.email,
        target.challenge,
        code,
      )
      if (liveEmail() !== target.email) return
      let token = result.token
      if (result.status === 'verified' && token) {
        flushSync(() => {
          setVerification({ ...target, token })
          setCode('')
        })
        verifiedRef.current?.focus()
      } else {
        setVerifyError({
          field: 'code',
          message: result.message ?? refreshMessage,
        })
        codeRef.current?.focus()
      }
    } catch {
      setVerifyError({ field: 'code', message: refreshMessage })
    } finally {
      setBusy('idle')
    }
  }

  function handleEmailKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter' || verified) return
    event.preventDefault()
    if (codeSent) codeRef.current?.focus()
    else void sendCode()
  }

  function handleCodeKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Enter') return
    event.preventDefault()
    void confirmCode()
  }

  // Until the email is verified the Send button stays focusable (aria-disabled
  // rather than disabled, which screen readers skip and which drops focus),
  // and pressing it moves the visitor to the step they still need. This also
  // catches pressing Enter in the other fields, which "clicks" this button.
  function guardSend(event: MouseEvent<HTMLButtonElement>) {
    if (pending) {
      event.preventDefault()
      return
    }
    if (verified) return
    event.preventDefault()
    let emailInput = emailRef.current
    if (emailInput && !emailInput.checkValidity()) {
      emailInput.reportValidity()
      emailInput.focus()
    } else if (codeSent) {
      codeRef.current?.focus()
    } else {
      verifyButtonRef.current?.focus()
    }
  }

  // Dispatching from onSubmit instead of letting the form's action run skips
  // React 19's automatic form reset, which would otherwise wipe the name,
  // reason and message whenever the server answers with an error.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!verified || pending) return
    let formData = new FormData(event.currentTarget)
    startTransition(() => formAction(formData))
  }

  if (state.status === 'success') {
    return (
      <div className="mt-6">
        <p
          ref={confirmationRef}
          tabIndex={-1}
          role="status"
          className="text-zinc-600 outline-none dark:text-zinc-400"
        >
          Thanks - your enquiry is on its way. I’ll be in touch soon.
        </p>
        <button type="button" onClick={onReset} className={resetLink}>
          Send another enquiry
        </button>
      </div>
    )
  }

  let verifyLabel =
    busy === 'sending'
      ? 'Sending…'
      : coolingDown
        ? `Resend in ${cooldown}s`
        : codeSent
          ? 'Resend code'
          : 'Verify'
  let verifyResting = busy !== 'idle' || coolingDown
  let errorId = verifyError ? 'verify-error' : undefined

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="mt-6 space-y-5"
    >
      {/* Honeypot: hidden from real visitors, catches naive bots. Inline style
          so it stays hidden even if the stylesheet fails to load. */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="company">Company</label>
        <input
          ref={honeypotRef}
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            maxLength={80}
            autoComplete="given-name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Surname
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            maxLength={80}
            autoComplete="family-name"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <div className={underlineRow}>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              required
              maxLength={maxEmailLength}
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setVerifyError(null)
              }}
              onKeyDown={handleEmailKeyDown}
              aria-invalid={verifyError?.field === 'email' || undefined}
              aria-describedby={
                verified
                  ? 'email-verified'
                  : verifyError?.field === 'email'
                    ? errorId
                    : undefined
              }
              className={rowFieldClass}
            />
            {verified ? (
              <span
                ref={verifiedRef}
                id="email-verified"
                tabIndex={-1}
                className="shrink-0 text-sm text-zinc-600 outline-none dark:text-zinc-400"
              >
                Verified<span aria-hidden="true"> ✓</span>
              </span>
            ) : (
              <button
                ref={verifyButtonRef}
                type="button"
                onClick={() => void sendCode()}
                aria-disabled={verifyResting || undefined}
                className={clsx(
                  rowButton,
                  verifyResting ? rowButtonResting : textButton,
                )}
              >
                {verifyLabel}
              </button>
            )}
          </div>
        </div>

        {codeSent ? (
          <div>
            <label htmlFor="verification-code" className={labelClass}>
              Verification code
            </label>
            <div className={underlineRow}>
              {/* No name: the code is checked on its own, never posted with
                  the enquiry. Not type="number", which drops leading zeros. */}
              <input
                ref={codeRef}
                id="verification-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(event) => {
                  // Strip spaces and dashes so a pasted "123 456" still fits.
                  setCode(event.target.value.replace(/\D/g, '').slice(0, 6))
                  if (verifyError?.field === 'code') setVerifyError(null)
                }}
                onKeyDown={handleCodeKeyDown}
                aria-invalid={verifyError?.field === 'code' || undefined}
                aria-describedby={clsx(
                  'code-hint',
                  verifyError?.field === 'code' && errorId,
                )}
                className={clsx(rowFieldClass, 'tabular-nums tracking-[0.3em]')}
              />
              <button
                type="button"
                onClick={() => void confirmCode()}
                aria-disabled={busy !== 'idle' || undefined}
                className={clsx(
                  rowButton,
                  busy !== 'idle' ? rowButtonResting : textButton,
                )}
              >
                {busy === 'checking' ? 'Checking…' : 'Confirm'}
              </button>
            </div>
            {/* break-words: an email address has no natural break point, so a
                long one would otherwise push the page sideways on phones. */}
            <p id="code-hint" className={clsx('mt-2 break-words', hintClass)}>
              I’ve emailed a 6-digit code to {verification.email}. It expires in
              10 minutes - if you can’t see it, check your spam folder.
            </p>
          </div>
        ) : null}

        {verifyError ? (
          <p
            id="verify-error"
            role="alert"
            className="text-sm text-red-700 dark:text-red-400"
          >
            {verifyError.message}
          </p>
        ) : null}
      </div>

      {/* Only posted once verified: the single-use pass submitEnquiry claims. */}
      <input
        type="hidden"
        name="verificationToken"
        value={verified ? verification.token : ''}
      />

      <div>
        <label htmlFor="reason" className={labelClass}>
          Reason of enquiry
        </label>
        <select
          id="reason"
          name="reason"
          required
          defaultValue=""
          className={selectClass}
        >
          <option value="" disabled>
            Select one
          </option>
          <option value="Project">Project</option>
          <option value="Collaboration">Collaboration</option>
          <option value="Hiring">Hiring</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Tell me more about it
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={4000}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="submit"
          onClick={guardSend}
          aria-disabled={!verified || pending || undefined}
          aria-describedby={verified ? undefined : 'send-hint'}
          className={clsx(
            sendButton,
            verified ? sendReady : sendWaiting,
            pending && 'cursor-wait opacity-70',
          )}
        >
          {pending ? 'Sending…' : 'Send enquiry'}
        </button>
        {verified ? null : (
          <p id="send-hint" className={hintClass}>
            Verify your email above to send your enquiry.
          </p>
        )}
      </div>
    </form>
  )
}
