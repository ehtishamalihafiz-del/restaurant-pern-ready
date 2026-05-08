import React from 'react'

export default function HelpCentre() {
  const faqs = ['How can I place an order?', 'How can I track my rider?', 'How do I request a refund?', 'Can I cancel my order?']

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: 64, fontFamily: "'Cormorant Garamond',serif" }}>Help Centre</h1>
        <img src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1200&auto=format&fit=crop" style={{ width: '100%', borderRadius: 24, margin: '30px 0' }} />
        {faqs.map(q => (
          <div className="card" key={q} style={{ padding: 24, marginBottom: 16 }}>
            <h2>{q}</h2>
            <p style={{ color: 'var(--text-muted)' }}>Our support team is available to help you with this query.</p>
          </div>
        ))}
      </div>
    </div>
  )
}