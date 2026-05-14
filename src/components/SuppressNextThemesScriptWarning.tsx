'use client'

// next-themes injects an inline <script> in its ThemeProvider so the
// correct light/dark class is set on <html> BEFORE React hydrates, which
// prevents the flash-of-wrong-theme on first paint. React 19 logs a
// dev-only warning about that script ("Encountered a script tag while
// rendering React component"). The script is intentional and works
// correctly - the warning is a false positive that the next-themes
// maintainer hasn't fixed yet (see github.com/pacocoursey/next-themes#387).
//
// This component silences that one specific React 19 message in
// development. Every other console error still surfaces normally, and
// production builds are unaffected (React strips dev warnings).
//
// Our own JSON-LD scripts no longer trigger this warning - they use
// useServerInsertedHTML to inject HTML outside the React component tree.

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  let realError = console.error
  let SUPPRESSED = 'Encountered a script tag while rendering React component.'
  console.error = function patchedError(...args: unknown[]) {
    let first = args[0]
    if (typeof first === 'string' && first.includes(SUPPRESSED)) {
      return
    }
    realError.apply(console, args as Parameters<typeof console.error>)
  }
}

export function SuppressNextThemesScriptWarning() {
  return null
}
