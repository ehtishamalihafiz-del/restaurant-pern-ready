import React from 'react'

export default function Press() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 64, fontFamily: "'Cormorant Garamond',serif" }}>Press & Media</h1>
        <p style={{ color: 'var(--text-muted)' }}>Latest news, brand updates, and media coverage from Royal Dine.</p>

        <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=1200&auto=format&fit=crop" style={{ width: '100%', borderRadius: 24, margin: '35px 0' }} />

        {['Royal Dine launches premium delivery experience', 'New seasonal chef menu announced', 'Royal Dine expands rider tracking experience'].map(title => (
          <div className="card" key={title} style={{ padding: 26, marginBottom: 18 }}>
            <h2>{title}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Official Royal Dine update for customers and media partners.</p>
          </div>
        ))}
      </div>
    </div>
  )
}