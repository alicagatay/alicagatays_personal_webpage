// Email helpers shared by the enquiry form and its Server Actions. This module
// is bundled for the browser too, so it must stay free of Node-only APIs (the
// server-side checks live in email-verification.ts).

// Where enquiries land. Already public on the page as the "Email" link.
export let contactEmail = 'aliccagatay@gmail.com'

// Matches the form's maxLength. The server checks it before running any
// regex, so an oversized payload can't make validation slow.
export let maxEmailLength = 160

// The comparison form of an address: what the visitor verified has to match
// what they send, whatever spacing or capitals they typed either time.
export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}
