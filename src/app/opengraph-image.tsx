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
          background:
            'linear-gradient(135deg, #09090b 0%, #18181b 50%, #0d9488 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            opacity: 0.7,
            letterSpacing: '0.05em',
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
            color: '#5eead4',
          }}
        >
          building intelligent systems.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            opacity: 0.8,
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
            opacity: 0.6,
          }}
        >
          <span>alicagatay.xyz</span>
          <span>Birmingham, UK</span>
        </div>
      </div>
    ),
    size,
  )
}
