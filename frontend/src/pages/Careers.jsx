import React from 'react'

export default function Careers() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 64, fontFamily: "'Cormorant Garamond',serif" }}>Careers at Royal Dine</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 700 }}>Join our kitchen, delivery, customer support, or management team and help us build a premium food delivery brand.</p>

        <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop" style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 24, margin: '35px 0' }} />

        {['Chef Assistant', 'Delivery Rider', 'Customer Support Officer', 'Restaurant Manager'].map(job => (
          <div className="card" key={job} style={{ padding: 24, marginBottom: 18 }}>
            <h2>{job}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Full-time role with training, growth, and performance rewards.</p>
            <button className="btn-outline">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  )
}