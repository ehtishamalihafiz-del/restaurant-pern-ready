import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const STATS = [
  { value: '4.9★', label: 'Rating' },
  { value: '30min', label: 'Avg Delivery' },
  { value: '50+', label: 'Menu Items' },
  { value: '10k+', label: 'Happy Guests' },
]

const FEATURES = [
  {
    icon: '🏆',
    title: 'Award-Winning Chefs',
    desc: 'Our culinary team brings Michelin-star technique to every dish you order.',
  },
  {
    icon: '🚀',
    title: 'Express Delivery',
    desc: 'Hot food at your door in under 35 minutes — or your next order is free.',
  },
  {
    icon: '🌿',
    title: 'Farm to Table',
    desc: 'Locally sourced, seasonally fresh ingredients in every preparation.',
  },
  {
    icon: '🔐',
    title: 'Secure Payments',
    desc: 'Card, Easypaisa, JazzCash — all transactions encrypted and protected.',
  },
]

const FEATURED_ITEMS = [
  {
    id: 1,
    name: 'Truffle Risotto',
    category: 'Italian',
    price: 1890,
    rating: 4.9,
    tag: "Chef's Pick",
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Wagyu Burger',
    category: 'Grill',
    price: 2200,
    rating: 4.8,
    tag: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Lobster Bisque',
    category: 'Seafood',
    price: 2600,
    rating: 4.9,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?q=80&w=1200&auto=format&fit=crop',
  },
]

export default function Home() {
  const heroRef = useRef(null)

  // Parallax subtle effect
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const y = window.scrollY
      heroRef.current.style.transform = `translateY(${y * 0.25}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      {/* ── Hero ───────────────────────────────── */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', paddingTop: '70px',
      }}>
        {/* Background orbs */}
        <div ref={heroRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '15%', left: '8%',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '10%', right: '5%',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(80,60,150,0.08) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }} />
          {/* Grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        {/* Floating food emojis */}
        {['🍽️', '🥂', '🌿', '⭐', '🍷'].map((e, i) => (
          <div key={i} className="anim-float" style={{
            position: 'absolute', fontSize: '28px', opacity: 0.12,
            top: `${15 + i * 16}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : undefined,
            right: i % 2 !== 0 ? `${5 + i * 2}%` : undefined,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${3 + i * 0.4}s`,
            pointerEvents: 'none', userSelect: 'none',
          }}>{e}</div>
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', padding: '0 24px' }}>

          {/* Tag */}
          <div className="anim-fadeUp badge" style={{ display: 'inline-flex', borderColor: 'var(--border)', color: 'var(--gold)', marginBottom: '28px' }}>
            <span>⭐</span> Lahore's #1 Premium Food Delivery
          </div>

          {/* Headline */}
          <h1 className="anim-fadeUp d100" style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(46px, 8vw, 88px)',
            fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.01em',
            color: 'var(--text-primary)', marginBottom: '24px',
          }}>
            Exquisite Dining,<br />
            <em className="text-gold" style={{ fontStyle: 'italic' }}>Delivered Royal</em>
          </h1>

          {/* Subtext */}
          <p className="anim-fadeUp d200" style={{
            color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.7,
            maxWidth: '560px', margin: '0 auto 40px',
          }}>
            Chef-crafted dishes prepared with the finest ingredients, delivered to your door in under 35 minutes.
          </p>

          {/* CTAs */}
          <div className="anim-fadeUp d300" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/menu" className="btn-primary" style={{ padding: '15px 36px', fontSize: '15px' }}>
              Explore Menu
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link to="/auth" className="btn-outline" style={{ padding: '15px 32px', fontSize: '15px' }}>
              Sign Up Free
            </Link>
          </div>

          {/* Stats */}
          <div className="anim-fadeUp d400" style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '56px', flexWrap: 'wrap' }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div className="text-gold" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 700 }}>{s.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px', fontFamily: "'JetBrains Mono',monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: "'JetBrains Mono',monospace", marginBottom: '8px' }}>Scroll</p>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg,var(--border),transparent)', margin: '0 auto', animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── Featured dishes ────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '12px' }}>Featured</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, color: 'var(--text-primary)' }}>
            Tonight's Highlights
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginTop: '12px' }}>Handpicked by our head chef every evening</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {FEATURED_ITEMS.map((item, i) => (
            <div key={item.id} className={`card anim-fadeUp`} style={{ padding: '0', overflow: 'hidden', animationDelay: `${i * 150}ms` }}>
              {/* Image area */}
              <div style={{
                height: '200px', background: `linear-gradient(135deg, rgba(201,168,76,0.08), rgba(30,20,60,0.8))`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '72px', position: 'relative',
              }}>
                <img
  src={item.image}
  alt={item.name}
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }}
/>
                <span style={{
                  position: 'absolute', top: '12px', left: '12px',
                  background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
                  color: '#07090F', fontSize: '10px', fontWeight: 800,
                  padding: '4px 10px', borderRadius: '999px', letterSpacing: '0.06em',
                  fontFamily: "'JetBrains Mono',monospace",
                }}>{item.tag}</span>
              </div>

              <div style={{ padding: '20px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.category}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>{item.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="text-gold" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700 }}>
                    Rs {item.price.toLocaleString()}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ color: '#F6C90E', fontSize: '13px' }}>★</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/menu" className="btn-outline" style={{ padding: '13px 36px' }}>
            View Full Menu
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
          </Link>
        </div>
      </section>

      {/* ── Features ───────────────────────────── */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '12px' }}>Why Choose Us</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(30px,4vw,48px)', fontWeight: 700, color: 'var(--text-primary)' }}>The Royal Difference</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className="anim-fadeUp" style={{
                background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)',
                borderRadius: '18px', padding: '28px', animationDelay: `${i * 100}ms`,
                transition: 'border-color .3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────── */}
      <section style={{ maxWidth: '1200px', margin: '80px auto', padding: '0 24px' }}>
        <div style={{
          borderRadius: '24px', padding: '60px 40px', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(30,20,60,0.6) 100%)',
          border: '1px solid var(--border)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.15), transparent)', pointerEvents: 'none' }} />
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '16px' }}>Limited Time</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Free Delivery on Your First Order
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
            Sign up today and experience Royal Dine with complimentary delivery — no minimum order required.
          </p>
          <Link to="/auth" className="btn-primary" style={{ padding: '15px 40px', fontSize: '15px' }}>
            Claim Your Offer
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes scrollPulse {
          0%,100% { opacity:.3; }
          50%      { opacity:1; }
        }
      `}</style>
    </div>
  )
}
