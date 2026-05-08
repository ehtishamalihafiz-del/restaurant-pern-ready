import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function QtyBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: '28px', height: '28px', borderRadius: '7px',
      background: 'var(--surface)', border: '1px solid var(--border-subtle)',
      color: 'var(--text-primary)', fontWeight: 700, fontSize: '15px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', transition: 'all .15s', fontFamily: "'Outfit',sans-serif",
      flexShrink: 0,
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--gold)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)' }}
    >{children}</button>
  )
}

export default function CartDrawer() {
  const { items, removeItem, setQty, clear, subtotal, count, open, setOpen } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const DELIVERY = subtotal > 0 ? 150 : 0
  const total    = subtotal + DELIVERY

  const handleCheckout = () => {
    setOpen(false)
    if (!user) { navigate('/auth'); return }
    navigate('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 998,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
          transition: 'opacity .3s',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
      />

      {/* Drawer */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 999,
        width: '100%', maxWidth: '420px',
        background: 'var(--bg-elevated)',
        borderLeft: '1px solid var(--border-subtle)',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform .35s cubic-bezier(0.32, 0.72, 0, 1)',
        boxShadow: open ? '-20px 0 60px rgba(0,0,0,0.6)' : 'none',
      }}>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Your Order
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>
              {count === 0 ? 'Nothing added yet' : `${count} item${count > 1 ? 's' : ''} in cart`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {items.length > 0 && (
              <button
                onClick={clear}
                style={{ color: 'var(--error)', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: '6px', fontFamily: "'Outfit',sans-serif", transition: 'background .2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,107,107,0.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--surface)', border: '1px solid var(--border-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }} className="no-scrollbar">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '60px' }}>
              <div style={{ fontSize: '52px', marginBottom: '16px' }}>🍽️</div>
              <p style={{ color: 'var(--text-secondary)', fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontStyle: 'italic' }}>
                Your cart is empty
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>
                Add items from our menu to get started
              </p>
              <button onClick={() => setOpen(false)} className="btn-outline" style={{ marginTop: '24px' }}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {items.map(item => (
                <div key={item.id} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                  borderRadius: '14px', padding: '14px', display: 'flex', gap: '12px',
                  alignItems: 'center',
                }}>
                  {/* Image / emoji */}
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '10px', flexShrink: 0,
                    background: 'var(--surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                  }}>
                    {item.image_url
                      ? <img src={item.image_url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                      : item.emoji || '🍴'
                    }
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </p>
                    <p style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: 700, marginTop: '2px' }}>
                      Rs {(item.price * item.qty).toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <QtyBtn onClick={() => setQty(item.id, item.qty - 1)}>−</QtyBtn>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '14px', minWidth: '18px', textAlign: 'center' }}>{item.qty}</span>
                    <QtyBtn onClick={() => setQty(item.id, item.qty + 1)}>+</QtyBtn>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', transition: 'color .2s', flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--error)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-subtle)', flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Subtotal</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>Rs {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Delivery</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>Rs {DELIVERY}</span>
              </div>
              <div className="divider-gold" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 700 }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700 }} className="text-gold">
                  Rs {total.toLocaleString()}
                </span>
              </div>
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '14px' }} onClick={handleCheckout}>
              {user ? 'Proceed to Checkout' : 'Sign In to Checkout'}
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
