import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api'

const PAYMENT_METHODS = [
  { id: 'card', icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, UnionPay' },
  { id: 'easypaisa', icon: '📱', label: 'Easypaisa', desc: 'Mobile wallet payment' },
  { id: 'jazzcash', icon: '📲', label: 'JazzCash', desc: 'Mobile wallet payment' },
  { id: 'cash_on_delivery', icon: '💵', label: 'Cash on Delivery', desc: 'Pay when you receive' },
]

function Step({ n, label, active, done }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: '12px',
        background: done ? 'linear-gradient(135deg,#C9A84C,#9B7A2F)' : active ? 'var(--surface)' : 'var(--bg-card)',
        border: done ? 'none' : active ? '2px solid var(--gold)' : '1px solid var(--border-subtle)',
        color: done ? '#07090F' : active ? 'var(--gold)' : 'var(--text-muted)',
        transition: 'all .3s',
      }}>
        {done ? '✓' : n}
      </div>
      <span style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? 'var(--text-primary)' : 'var(--text-muted)', transition: 'color .3s' }}>{label}</span>
    </div>
  )
}

export default function Checkout() {
  const { items, subtotal, clear } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(1) // 1=delivery, 2=payment, 3=processing
  const [payMethod, setPayMethod] = useState('card')
  const [payStatus, setPayStatus] = useState(null) // null | 'processing' | 'success' | 'failed'
  const [txnId, setTxnId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [delivery, setDelivery] = useState({
    address: '', city: 'Lahore', instructions: '', name: user?.name || '', phone: '', email: user?.email || '',
  })
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [mobile, setMobile] = useState('')

  const DELIVERY_FEE = 150
  const TOTAL = subtotal + DELIVERY_FEE

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '70px', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '56px' }}>🛒</div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'var(--text-primary)' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Add some items before checking out</p>
        <button className="btn-primary" style={{ marginTop: '8px' }} onClick={() => navigate('/menu')}>Browse Menu</button>
      </div>
    )
  }

  // Format card input
  const fmtCard = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExp = v => { const d = v.replace(/\D/g, ''); return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2, 4) : d }

  const handlePayment = async () => {
    setError('')
    setLoading(true)
    setPayStatus('processing')

    setTimeout(() => {
      if (payMethod === 'card') {
        if (!card.number || !card.expiry || !card.cvv || !card.name) {
          setPayStatus('failed')
          setError('Please fill complete card details')
          setLoading(false)
          return
        }
      }

      if (['easypaisa', 'jazzcash'].includes(payMethod)) {
        if (!mobile) {
          setPayStatus('failed')
          setError('Please enter mobile wallet number')
          setLoading(false)
          return
        }
      }

      const fakeTxnId =
        payMethod === 'cash_on_delivery'
          ? 'COD'
          : 'RD-' + Date.now()

      setTxnId(fakeTxnId)
      setPayStatus('success')
      setLoading(false)
    }, 2500)
  }

const handlePlaceOrder = async () => {
  setError('')
  setLoading(true)

  setTimeout(() => {
    const localOrderId = 'ORDER-' + Date.now()

    localStorage.setItem(
      'rd_last_order',
      JSON.stringify({
        id: localOrderId,
        items,
        total: TOTAL,
        payment_method: payMethod,
        payment_status: payStatus,
        transaction_id: txnId,
        delivery,
        created_at: new Date().toISOString(),
      })
    )

    clear()
    setLoading(false)
    navigate(`/track/${localOrderId}`)
  }, 1000)
}

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', padding: '110px 24px 80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '8px' }}>Checkout</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: 'var(--text-primary)' }}>Complete Your Order</h1>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Step n={1} label="Delivery" active={step === 1} done={step > 1} />
          <div style={{ height: '1px', width: '40px', background: 'var(--border-subtle)' }} />
          <Step n={2} label="Payment" active={step === 2} done={payStatus === 'success'} />
          <div style={{ height: '1px', width: '40px', background: 'var(--border-subtle)' }} />
          <Step n={3} label="Confirm" active={payStatus === 'success'} done={false} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '28px', alignItems: 'start' }}>

          {/* Left panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* STEP 1: Delivery info */}
            {step === 1 && (
              <div className="anim-scaleIn" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '28px' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🏠</span> Delivery Details
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name', col: 1 },
                    { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '03xx xxxxxxx', col: 1 },
                    { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', col: 2 },
                    { key: 'city', label: 'City', type: 'text', placeholder: 'Lahore', col: 1 },
                  ].map(f => (
                    <div key={f.key} style={{ gridColumn: f.col === 2 ? '1/-1' : undefined }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>{f.label}</label>
                      <input className="input-field" type={f.type} placeholder={f.placeholder} value={delivery[f.key]} onChange={e => setDelivery(d => ({ ...d, [f.key]: e.target.value }))} />
                    </div>
                  ))}
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>Delivery Address</label>
                    <textarea className="input-field" rows={2} placeholder="House/flat no., street, area..." value={delivery.address} onChange={e => setDelivery(d => ({ ...d, address: e.target.value }))} style={{ resize: 'none' }} />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>Special Instructions <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none' }}>(optional)</span></label>
                    <input className="input-field" type="text" placeholder="e.g. Ring the bell, extra napkins..." value={delivery.instructions} onChange={e => setDelivery(d => ({ ...d, instructions: e.target.value }))} />
                  </div>
                </div>
                <button
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '24px', padding: '14px' }}
                  onClick={() => { if (!delivery.address || !delivery.name) { setError('Please fill delivery name and address'); return } setError(''); setStep(2) }}
                >
                  Continue to Payment
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </button>
                {error && <p style={{ color: 'var(--error)', fontSize: '13px', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && payStatus !== 'success' && (
              <div className="anim-scaleIn" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '28px' }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>💳</span> Payment Method
                </h2>

                {/* Method select */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {PAYMENT_METHODS.map(pm => (
                    <label key={pm.id} style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      background: payMethod === pm.id ? 'var(--gold-faint)' : 'var(--bg-card)',
                      border: `1px solid ${payMethod === pm.id ? 'var(--border)' : 'var(--border-subtle)'}`,
                      borderRadius: '14px', padding: '14px 16px', cursor: 'pointer', transition: 'all .2s',
                    }}>
                      <input type="radio" name="pm" value={pm.id} checked={payMethod === pm.id} onChange={() => setPayMethod(pm.id)} style={{ accentColor: 'var(--gold)', width: '16px', height: '16px' }} />
                      <span style={{ fontSize: '22px' }}>{pm.icon}</span>
                      <div>
                        <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>{pm.label}</p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{pm.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Card fields */}
                {payMethod === 'card' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', padding: '20px', background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>Card Number</label>
                      <input className="input-field" type="text" placeholder="1234 5678 9012 3456" value={card.number} onChange={e => setCard(c => ({ ...c, number: fmtCard(e.target.value) }))} maxLength={19} style={{ fontFamily: "'JetBrains Mono',monospace", letterSpacing: '0.12em' }} />
                      <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '5px' }}>Use 4242 4242 4242 4242 to test a success</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                      <div style={{ gridColumn: '1/3' }}>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>Expiry</label>
                        <input className="input-field" type="text" placeholder="MM/YY" value={card.expiry} onChange={e => setCard(c => ({ ...c, expiry: fmtExp(e.target.value) }))} maxLength={5} />
                      </div>
                      <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>CVV</label>
                        <input className="input-field" type="text" placeholder="123" value={card.cvv} onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))} maxLength={4} />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>Name on Card</label>
                      <input className="input-field" type="text" placeholder="As printed on card" value={card.name} onChange={e => setCard(c => ({ ...c, name: e.target.value }))} />
                    </div>
                  </div>
                )}

                {/* Mobile wallet */}
                {['easypaisa', 'jazzcash'].includes(payMethod) && (
                  <div style={{ marginBottom: '24px', padding: '20px', background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '7px' }}>Registered Mobile Number</label>
                    <input className="input-field" type="tel" placeholder="03xx xxxxxxx" value={mobile} onChange={e => setMobile(e.target.value)} />
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px' }}>A payment request will be sent to your {payMethod === 'easypaisa' ? 'Easypaisa' : 'JazzCash'} account.</p>
                  </div>
                )}

                {payStatus === 'processing' && (
                  <div style={{ textAlign: 'center', padding: '20px', background: 'var(--gold-faint)', borderRadius: '14px', border: '1px solid var(--border)', marginBottom: '16px' }}>
                    <div style={{ fontSize: '32px', animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
                    <p style={{ color: 'var(--gold-light)', fontWeight: 600, marginTop: '8px' }}>Processing payment...</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>Please wait</p>
                  </div>
                )}

                {payStatus === 'failed' && (
                  <div style={{ background: 'rgba(239,107,107,0.08)', border: '1px solid rgba(239,107,107,0.25)', borderRadius: '12px', padding: '14px', marginBottom: '16px', color: 'var(--error)', fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span>⚠️</span> {error || 'Payment failed. Please try again.'}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn-outline" onClick={() => { setStep(1); setPayStatus(null); setError('') }} style={{ flex: 1, padding: '13px' }}>
                    ← Back
                  </button>
                  <button className="btn-primary" onClick={handlePayment} disabled={loading || payStatus === 'processing'} style={{ flex: 2, padding: '13px' }}>
                    {payStatus === 'processing' ? 'Processing...' : `Pay Rs ${TOTAL.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment success — confirm order */}
            {payStatus === 'success' && (
              <div className="anim-scaleIn" style={{ background: 'var(--bg-elevated)', border: '1px solid rgba(82,212,138,0.2)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(82,212,138,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px' }}>✅</div>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '26px', fontWeight: 700, color: 'var(--success)', marginBottom: '8px' }}>Payment Confirmed!</h2>
                {txnId !== 'COD' && (
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: "'JetBrains Mono',monospace", marginBottom: '8px' }}>Txn ID: {txnId}</p>
                )}
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>
                  {payMethod === 'cash_on_delivery' ? 'Order confirmed — pay Rs ' + TOTAL.toLocaleString() + ' on delivery' : 'Your payment of Rs ' + TOTAL.toLocaleString() + ' was successful'}
                </p>
                {error && <p style={{ color: 'var(--error)', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}
                <button className="btn-primary" onClick={handlePlaceOrder} disabled={loading} style={{ padding: '14px 48px', fontSize: '15px' }}>
                  {loading ? 'Placing Order...' : 'Place Order & Track 🚀'}
                </button>
              </div>
            )}
          </div>

          {/* Right: Order summary */}
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '24px', position: 'sticky', top: '90px' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                    {item.emoji || '🍴'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>× {item.qty}</p>
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600, flexShrink: 0 }}>Rs {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="divider" style={{ marginBottom: '16px' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Subtotal</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>Rs {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Delivery fee</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 600 }}>Rs {DELIVERY_FEE}</span>
              </div>
              <div className="divider-gold" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 700 }}>Total</span>
                <span className="text-gold" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '24px', fontWeight: 700 }}>Rs {TOTAL.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '14px', background: 'rgba(82,212,138,0.06)', border: '1px solid rgba(82,212,138,0.15)', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>🕐</span>
              <div>
                <p style={{ color: 'var(--success)', fontSize: '13px', fontWeight: 600 }}>Estimated delivery</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>30 – 45 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
