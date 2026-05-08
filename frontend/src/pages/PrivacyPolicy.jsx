import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Hero Section */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 40,
            alignItems: 'center',
            marginBottom: 60,
          }}
        >
          <div>
            <p
              style={{
                color: 'var(--gold)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Royal Dine Security
            </p>

            <h1
              style={{
                fontSize: 'clamp(42px,7vw,72px)',
                fontFamily: "'Cormorant Garamond',serif",
                marginBottom: 18,
              }}
            >
              Privacy Policy
            </h1>

            <p
              style={{
                color: 'var(--text-muted)',
                lineHeight: 1.9,
                fontSize: 16,
              }}
            >
              Royal Dine respects and protects customer privacy. We are committed
              to securing personal information including orders, payment details,
              addresses, and account activity while delivering a premium food
              ordering experience.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop"
            alt="Privacy Protection"
            style={{
              width: '100%',
              height: 360,
              objectFit: 'cover',
              borderRadius: 28,
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.45)',
            }}
          />
        </section>

        {/* Policy Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: 24,
          }}
        >
          {[
            {
              title: 'Personal Information',
              text: 'We collect customer information such as name, email, phone number, and delivery address to process orders and provide support.',
            },
            {
              title: 'Secure Payments',
              text: 'All online payments are securely processed and protected using encrypted payment systems and security standards.',
            },
            {
              title: 'Order Tracking',
              text: 'Location and delivery data may be temporarily used to provide accurate rider tracking and estimated delivery times.',
            },
            {
              title: 'Data Protection',
              text: 'Royal Dine uses secure systems to protect customer information from unauthorized access or misuse.',
            },
            {
              title: 'Communication',
              text: 'Customers may receive order updates, promotions, or service notifications through email or SMS.',
            },
            {
              title: 'Customer Rights',
              text: 'Users may request updates, corrections, or deletion of personal information stored in Royal Dine systems.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card"
              style={{
                padding: 28,
                borderRadius: 24,
              }}
            >
              <h2
                style={{
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                  fontSize: 24,
                }}
              >
                {item.title}
              </h2>

              <p
                style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.8,
                }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          className="card"
          style={{
            padding: 36,
            marginTop: 36,
            borderRadius: 28,
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: 36,
              marginBottom: 16,
            }}
          >
            Customer Trust First
          </h2>

          <p
            style={{
              color: 'var(--text-muted)',
              lineHeight: 1.9,
              fontSize: 16,
            }}
          >
            Royal Dine continuously improves security systems and privacy
            practices to ensure customers enjoy safe food ordering, secure
            transactions, and complete confidence while using our platform.
          </p>
        </div>
      </div>
    </div>
  )
}