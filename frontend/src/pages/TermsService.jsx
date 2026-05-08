import React from 'react'

export default function TermsService() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 40,
          alignItems: 'center',
          marginBottom: 50
        }}>
          <div>
            <p style={{ color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Royal Dine Policy
            </p>

            <h1 style={{
              fontSize: 'clamp(42px,7vw,72px)',
              fontFamily: "'Cormorant Garamond',serif",
              marginBottom: 18
            }}>
              Terms of Service
            </h1>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
              These terms explain how customers may use Royal Dine’s online food ordering,
              payment, delivery, tracking, and support services. By placing an order, you agree
              to follow these service conditions.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1200&auto=format&fit=crop"
            alt="Customer service agreement"
            style={{
              width: '100%',
              height: 360,
              objectFit: 'cover',
              borderRadius: 28,
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.45)'
            }}
          />
        </section>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
          gap: 22
        }}>
          {[
            {
              title: 'Ordering Rules',
              text: 'Customers must provide correct name, phone number, address, and delivery instructions before confirming an order.'
            },
            {
              title: 'Payment Conditions',
              text: 'Online orders are confirmed only after successful payment. Failed or cancelled payments will not create a confirmed order.'
            },
            {
              title: 'Delivery Timing',
              text: 'Estimated delivery times may change due to traffic, weather, order volume, or rider availability.'
            },
            {
              title: 'Cancellation',
              text: 'Orders can be cancelled before preparation starts. Once food preparation begins, cancellation may not be available.'
            },
            {
              title: 'Refunds',
              text: 'Refunds may be reviewed for missing, incorrect, damaged, or cancelled orders according to our refund policy.'
            },
            {
              title: 'Account Use',
              text: 'Users are responsible for keeping their account information accurate and for activity performed through their account.'
            },
          ].map((item) => (
            <div key={item.title} className="card" style={{ padding: 28 }}>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: 10 }}>
                {item.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 32, marginTop: 32 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34 }}>
            Important Notice
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.9 }}>
            Royal Dine may update these terms when new services, payment methods, or delivery
            features are added. Continued use of the website means you accept the updated terms.
          </p>
        </div>
      </div>
    </div>
  )
}