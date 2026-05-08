import React from 'react'

export default function About() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'center' }}>
        <div>
          <p style={{ color: 'var(--gold)', letterSpacing: '0.25em' }}>ABOUT US</p>
          <h1 style={{ fontSize: 'clamp(42px,7vw,76px)', fontFamily: "'Cormorant Garamond',serif" }}>Royal Taste, Modern Delivery</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            Royal Dine is built to bring premium restaurant food to customers with elegance, speed, and trust.
            Our mission is to combine luxury presentation, fresh ingredients, and reliable delivery in one platform.
          </p>
          <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
            <div className="card" style={{ padding: 20 }}><h2>15+</h2><p>Menu Items</p></div>
            <div className="card" style={{ padding: 20 }}><h2>4.9★</h2><p>Customer Rating</p></div>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop" style={{ width: '100%', borderRadius: 24 }} />
      </div>
    </div>
  )
}