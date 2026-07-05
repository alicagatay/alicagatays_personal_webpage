'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { submitEnquiry, type ContactState } from '@/lib/contact'

let initialState: ContactState = { status: 'idle' }

let labelClass =
  'mb-1.5 block text-xs uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500'

let fieldClass =
  'w-full border-b border-zinc-300 bg-transparent py-1.5 text-zinc-900 transition placeholder:text-zinc-400 focus:border-teal-700 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-teal-400'

// The native <select>'s open option menu inherits the control's background; an
// explicit one keeps it readable in dark mode on platforms that don't theme it.
let selectClass = fieldClass.replace('bg-transparent', 'bg-paper dark:bg-ink')

let resetLink =
  'mt-3 text-sm text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-teal-700 hover:decoration-teal-700 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-teal-400 dark:hover:decoration-teal-400'

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
  let [state, formAction, pending] = useActionState(submitEnquiry, initialState)
  let confirmationRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      // Move focus onto the confirmation so the form (and the button that was
      // just activated, now unmounted) doesn't drop keyboard/SR users to <body>.
      confirmationRef.current?.focus()
    }
  }, [state.status])

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

  return (
    <form action={formAction} className="mt-6 space-y-5">
      {/* Honeypot: hidden from real visitors, catches naive bots. Inline style
          so it stays hidden even if the stylesheet fails to load. */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="company">Company</label>
        <input
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

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={160}
          autoComplete="email"
          className={fieldClass}
        />
      </div>

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
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 focus:ring-offset-paper disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-ink"
      >
        {pending ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}
