import React from 'react'

export default function CookiePolicy() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Hero Section */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
          gap: 40,
          alignItems: 'center',
          marginBottom: 60
        }}>
          <div>
            <p style={{
              color: 'var(--gold)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: 12
            }}>
              Website Security & Experience
            </p>

            <h1 style={{
              fontSize: 'clamp(42px,7vw,72px)',
              fontFamily: "'Cormorant Garamond',serif",
              marginBottom: 18
            }}>
              Cookie Policy
            </h1>

            <p style={{
              color: 'var(--text-muted)',
              lineHeight: 1.9,
              fontSize: 16
            }}>
              Royal Dine uses cookies and similar technologies to improve user
              experience, remember customer preferences, keep accounts secure,
              and personalize food recommendations for every visitor.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
            alt="Cookie Policy"
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

        {/* Policy Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
          gap: 24
        }}>

          {[
            {
              title: 'Essential Cookies',
              text: 'These cookies help basic website functions such as login, cart management, and secure payment processing.'
            },
            {
              title: 'Performance Cookies',
              text: 'Performance cookies help us understand how visitors use Royal Dine so we can improve speed and usability.'
            },
            {
              title: 'Preference Cookies',
              text: 'These cookies remember language settings, saved addresses, favorite meals, and theme preferences.'
            },
            {
              title: 'Security Cookies',
              text: 'Security cookies protect customer accounts and help prevent fraud or unauthorized access.'
            },
            {
              title: 'Marketing Cookies',
              text: 'These cookies may show customers personalized food offers, discounts, and seasonal recommendations.'
            },
            {
              title: 'Customer Control',
              text: 'Customers can disable cookies through browser settings, but some website features may not work correctly.'
            },
          ].map((item) => (
            <div
              key={item.title}
              className="card"
              style={{
                padding: 28,
                borderRadius: 24
              }}
            >
              <h2 style={{
                color: 'var(--text-primary)',
                marginBottom: 12,
                fontSize: 24
              }}>
                {item.title}
              </h2>

              <p style={{
                color: 'var(--text-muted)',
                lineHeight: 1.8
              }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Notice */}
        <div
          className="card"
          style={{
            padding: 36,
            marginTop: 36,
            borderRadius: 28
          }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 36,
            marginBottom: 16
          }}>
            Your Privacy Matters
          </h2>

          <p style={{
            color: 'var(--text-muted)',
            lineHeight: 1.9,
            fontSize: 16
          }}>
            Royal Dine respects customer privacy and ensures all browsing and
            ordering information remains protected. Cookies are used only to
            enhance user experience, improve service quality, and maintain
            website security.
          </p>
        </div>

      </div>
    </div>
  )
}