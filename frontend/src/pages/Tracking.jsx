import React from 'react'

export default function Tracking() {
  const steps = ['Order Confirmed', 'Preparing', 'Picked Up', 'On The Way', 'Nearby', 'Delivered']

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 64, fontFamily: "'Cormorant Garamond',serif" }}>Track Your Order</h1>
        <p style={{ color: 'var(--text-muted)' }}>Live rider tracking preview for your Royal Dine delivery.</p>

        <div className="card" style={{ marginTop: 35, overflow: 'hidden' }}>
          <div style={{
            height: 430,
            position: 'relative',
            background: `
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              radial-gradient(circle at 30% 40%, rgba(201,168,76,0.25), transparent 25%),
              #10131d
            `,
            backgroundSize: '45px 45px,45px 45px,100% 100%',
          }}>
            <div style={{
              position: 'absolute',
              left: '12%',
              top: '65%',
              width: '76%',
              height: 6,
              borderRadius: 999,
              background: 'linear-gradient(90deg,var(--gold),rgba(201,168,76,0.2))',
            }} />

            <div style={{ position: 'absolute', left: '10%', top: '58%', fontSize: 34 }}>🏠</div>
            <div style={{ position: 'absolute', right: '10%', top: '48%', fontSize: 38 }}>🍽️</div>

            <div style={{
              position: 'absolute',
              left: '55%',
              top: '52%',
              fontSize: 42,
              animation: 'float 2s ease-in-out infinite',
              filter: 'drop-shadow(0 10px 20px rgba(201,168,76,0.45))',
            }}>
              🛵
            </div>

            <div style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              background: 'rgba(0,0,0,0.55)',
              padding: 18,
              borderRadius: 18,
              border: '1px solid var(--border-subtle)',
            }}>
              <h2>Rider is on the way</h2>
              <p style={{ color: 'var(--text-muted)' }}>Estimated arrival: 18 minutes</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14, marginTop: 28 }}>
          {steps.map((s, i) => (
            <div className="card" key={s} style={{ padding: 18, borderColor: i <= 3 ? 'var(--gold)' : 'var(--border-subtle)' }}>
              <p style={{ color: i <= 3 ? 'var(--gold)' : 'var(--text-muted)' }}>{i <= 3 ? '✓' : '○'} {s}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}