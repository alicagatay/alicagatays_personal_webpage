'use client'

import { useRef } from 'react'
import { useServerInsertedHTML } from 'next/navigation'

// Injects schema.org JSON-LD into the initial server-rendered HTML using
// Next.js's useServerInsertedHTML hook, without placing a <script> element
// inside the React component tree. This means:
//
// - Crawlers (Google, GPTBot, ClaudeBot, etc.) see the JSON-LD in the
//   initial HTML response, exactly as required by schema.org.
// - React's client reconciliation never sees the script tag, so React 19's
//   "Encountered a script tag while rendering React component" warning
//   never fires - including across client-side navigation like a language
//   switch.
//
// useServerInsertedHTML is called once per streaming flush, so we use a
// useRef to ensure the script is only emitted once per component instance
// (same dedup pattern that styled-components and other SSR libraries use).
export function JsonLd({ id, data }: { id: string; data: object }) {
  let insertedRef = useRef(false)

  useServerInsertedHTML(() => {
    if (insertedRef.current) return null
    insertedRef.current = true
    return (
      <script
        id={id}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    )
  })

  return null
}
