import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const alt = 'Ali Cagatay - AI Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#f4f3ee',
          color: '#16150f',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: '#a1a1aa',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          Ali Cagatay
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          AI Engineer
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#0f766e',
          }}
        >
          building intelligent systems.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: '#52525b',
            lineHeight: 1.4,
          }}
        >
          Deep learning · Computer vision · Agentic systems · Full-stack
        </div>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: '#71717a',
          }}
        >
          <span>alicagatay.xyz</span>
          <span>AI Engineer · Software Builder · Founder</span>
        </div>
      </div>
    ),
    size,
  )
}
