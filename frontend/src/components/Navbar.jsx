import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout }   = useAuth()
  const { count, setOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [userMenu, setUserMenu] = useState(false)
  const dropRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onClick = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setUserMenu(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  if (location.pathname === '/auth') return null

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={scrolled
        ? { background: 'rgba(7,9,15,0.9)', backdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border-subtle)', boxShadow: '0 4px 30px rgba(0,0,0,0.4)' }
        : { background: 'transparent' }
      }
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '70px', gap: '32px' }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(201,168,76,0.35)',
              fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '20px', color: '#07090F'
            }}>R</div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '20px', color: 'var(--text-primary)', letterSpacing: '0.04em', lineHeight: 1 }}>
                Royal Dine
              </div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: 'var(--gold)', letterSpacing: '0.22em', textTransform: 'uppercase', lineHeight: 1, marginTop: '2px' }}>
                Fine Delivery
              </div>
            </div>
          </Link>

          {/* Nav links */}
          <nav style={{ display: 'flex', gap: '4px', flex: 1 }} className="mobile-hide-scroll">
            {[['/', 'Home'], ['/menu', 'Menu']].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="btn-ghost"
                style={{ color: location.pathname === to ? 'var(--gold-light)' : 'var(--text-secondary)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Cart */}
            <button
              onClick={() => setOpen(true)}
              style={{
                position: 'relative', background: 'var(--surface)', border: '1px solid var(--border-subtle)',
                borderRadius: '12px', width: '42px', height: '42px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all .2s', color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--gold-light)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {count > 0 && (
                <span className="anim-scaleIn" style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
                  color: '#07090F', fontSize: '10px', fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid var(--bg-deep)',
                }}>
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div ref={dropRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenu(v => !v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'var(--surface)', border: '1px solid var(--border-subtle)',
                    borderRadius: '12px', padding: '6px 12px 6px 6px',
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                >
                  <div style={{
                    width: '30px', height: '30px', borderRadius: '8px',
                    background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#07090F', fontWeight: 800, fontSize: '13px',
                  }}>
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 500, maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name}
                  </span>
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="var(--text-muted)" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenu && (
                  <div className="anim-scaleIn" style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                    minWidth: '190px', background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)', borderRadius: '14px',
                    boxShadow: '0 20px 50px rgba(0,0,0,.6)', overflow: 'hidden',
                    transformOrigin: 'top right',
                  }}>
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>{user.name}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>{user.email}</p>
                    </div>
                    <button
                      onClick={() => { logout(); navigate('/'); setUserMenu(false) }}
                      style={{
                        width: '100%', textAlign: 'left', padding: '12px 16px',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: '#EF6B6B', fontSize: '13px', fontWeight: 500,
                        fontFamily: "'Outfit',sans-serif", transition: 'background .2s',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,107,107,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
