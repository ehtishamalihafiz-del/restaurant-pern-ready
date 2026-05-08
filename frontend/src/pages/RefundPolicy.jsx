import React from 'react'

export default function RefundPolicy() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h1 style={{ fontSize: 64, fontFamily: "'Cormorant Garamond',serif" }}>Refund Policy</h1>
        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop" style={{ width: '100%', borderRadius: 24, margin: '30px 0' }} />
        <div className="card" style={{ padding: 32 }}>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            Refunds are available for cancelled orders, wrong items, missing items, or damaged delivery.
            Customers should contact support within 24 hours with order details. Approved refunds are processed after verification.
          </p>
        </div>
      </div>
    </div>
  )
}