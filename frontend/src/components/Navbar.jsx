import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
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
    const onClick = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setUserMenu(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  if (location.pathname === '/auth') return null

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: 'rgba(7,9,15,0.9)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
            }
          : { background: 'transparent' }
      }
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 12px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '70px',
            gap: '10px',
            width: '100%',
            overflow: 'visible',
          }}
        >
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              flexShrink: 0,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(201,168,76,0.35)',
                fontFamily: "'Cormorant Garamond',serif",
                fontWeight: 700,
                fontSize: '20px',
                color: '#07090F',
                flexShrink: 0,
              }}
            >
              R
            </div>

            <div className="nav-brand-text">
              <div
                style={{
                  fontFamily: "'Cormorant Garamond',serif",
                  fontWeight: 700,
                  fontSize: '20px',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                Royal Dine
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: '9px',
                  color: 'var(--gold)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  marginTop: '2px',
                  whiteSpace: 'nowrap',
                }}
              >
                Fine Delivery
              </div>
            </div>
          </Link>

          <nav
            className="nav-links"
            style={{
              display: 'flex',
              gap: '4px',
              flex: 1,
              justifyContent: 'center',
              minWidth: 0,
            }}
          >
            {[
              ['/', 'Home'],
              ['/menu', 'Menu'],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="btn-ghost"
                style={{
                  color: location.pathname === to ? 'var(--gold-light)' : 'var(--text-secondary)',
                  padding: '9px 12px',
                  fontSize: '13px',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              marginLeft: 'auto',
            }}
          >
            <button
              onClick={() => setOpen(true)}
              style={{
                position: 'relative',
                background: 'var(--surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all .2s',
                color: 'var(--text-secondary)',
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

              {count > 0 && (
                <span
                  className="anim-scaleIn"
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
                    color: '#07090F',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--bg-deep)',
                  }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>

            {user ? (
              <div ref={dropRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenu((v) => !v)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '6px 8px 6px 6px',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    maxWidth: '96px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#07090F',
                      fontWeight: 800,
                      fontSize: '13px',
                      flexShrink: 0,
                    }}
                  >
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </div>

                  <span
                    className="nav-user-name"
                    style={{
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 500,
                      maxWidth: '42px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.name}
                  </span>

                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="var(--text-muted)" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenu && (
                  <div
                    className="anim-scaleIn"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      minWidth: '190px',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '14px',
                      boxShadow: '0 20px 50px rgba(0,0,0,.6)',
                      overflow: 'hidden',
                      transformOrigin: 'top right',
                    }}
                  >
                    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                      <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600 }}>{user.name}</p>
                      <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        logout()
                        navigate('/')
                        setUserMenu(false)
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 16px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#EF6B6B',
                        fontSize: '13px',
                        fontWeight: 500,
                        fontFamily: "'Outfit',sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className="btn-primary" style={{ padding: '10px 14px', fontSize: '13px', whiteSpace: 'nowrap' }}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .nav-brand-text {
            display: none;
          }

          .nav-links {
            justify-content: flex-start !important;
            gap: 2px !important;
          }

          .nav-links a {
            padding: 8px 9px !important;
            font-size: 12px !important;
          }

          .nav-user-name {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}