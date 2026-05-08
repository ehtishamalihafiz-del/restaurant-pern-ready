import React from 'react'

export default function ContactUs() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 32 }}>
        <div>
          <h1 style={{ fontSize: 64, fontFamily: "'Cormorant Garamond',serif" }}>Contact Us</h1>
          <p style={{ color: 'var(--text-muted)' }}>We are here to help with orders, delivery, payments, and support.</p>

          {[
            ['📧', 'Email', 'support@royaldine.com'],
            ['📞', 'Phone', '+92 325 4128541'],
            ['📍', 'Address', 'Royal Dine Restaurant, Pakistan'],
          ].map(([icon, title, text]) => (
            <div className="card" key={title} style={{ padding: 22, marginTop: 18 }}>
              <h2>{icon} {title}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{text}</p>
            </div>
          ))}
        </div>

        <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1200&auto=format&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 24 }} />
      </div>
    </div>
  )
}