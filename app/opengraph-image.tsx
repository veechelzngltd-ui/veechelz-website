import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Veechelz Nigeria - Custom Window Blinds in Abuja'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
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
          background: '#18181B',
          color: '#F7F5F0',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#B38F5B', textTransform: 'uppercase' }}>
          Veechelz Nigeria Limited
        </div>
        <div style={{ display: 'flex', fontSize: 76, marginTop: 24, lineHeight: 1.1 }}>
          Custom Window Blinds, Made to Measure
        </div>
        <div style={{ display: 'flex', fontSize: 32, marginTop: 32, color: '#D6D3D1' }}>
          Abuja | Lagos | Port Harcourt
        </div>
      </div>
    ),
    { ...size }
  )
}