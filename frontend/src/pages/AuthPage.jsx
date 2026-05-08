import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api'

export default function AuthPage() {
  const [mode, setMode]     = useState('login') // 'login' | 'signup'
  const [form, setForm]     = useState({ name: '', email: '', password: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')
  const { login }           = useAuth()
  const navigate            = useNavigate()

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }
const submit = async (e) => {
  e.preventDefault()
  setError('')
  setLoading(true)

  setTimeout(() => {
    const userData = {
      name: form.name || form.email.split('@')[0],
      email: form.email,
      phone: form.phone || '',
    }

    login(userData, 'local-demo-token')
    setLoading(false)
    navigate('/')
  }, 800)
}


  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(ellipse at 40% 20%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(20,30,60,0.8) 0%, transparent 50%), var(--bg-deep)',
    }}>
      {/* Decorative line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,transparent,var(--gold),transparent)' }} />

      <div className="anim-fadeUp" style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 30px rgba(201,168,76,0.35)',
            fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: '32px', color: '#07090F'
          }}>R</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
            Royal Dine
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>
            {mode === 'login' ? 'Welcome back — sign in to continue' : 'Create your account to begin'}
          </p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: '20px', padding: '32px', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: '10px', padding: '4px', marginBottom: '28px', gap: '4px' }}>
            {[['login','Sign In'], ['signup','Create Account']].map(([m, label]) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError('') }}
                style={{
                  flex: 1, padding: '9px', borderRadius: '8px', border: 'none',
                  fontFamily: "'Outfit',sans-serif", fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all .2s',
                  background: mode === m ? 'var(--bg-card)' : 'transparent',
                  color: mode === m ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.3)' : 'none',
                }}
              >{label}</button>
            ))}
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name</label>
                <input className="input-field" type="text" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} required />
              </div>
            )}

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Email Address</label>
              <input className="input-field" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Password</label>
              <input className="input-field" type="password" placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Enter password'} value={form.password} onChange={e => set('password', e.target.value)} required />
            </div>

            {mode === 'signup' && (
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Phone <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                <input className="input-field" type="tel" placeholder="03xx xxxxxxx" value={form.phone} onChange={e => set('phone', e.target.value)} />
              </div>
            )}

            {error && (
              <div style={{ background: 'rgba(239,107,107,0.08)', border: '1px solid rgba(239,107,107,0.25)', borderRadius: '10px', padding: '12px 14px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--error)" strokeWidth={2} style={{ flexShrink: 0, marginTop: '1px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <p style={{ color: 'var(--error)', fontSize: '13px', lineHeight: 1.5 }}>{error}</p>
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', padding: '14px', marginTop: '4px', fontSize: '15px' }}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <svg className="anim-float" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ animation: 'spin 1s linear infinite' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '20px' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
              style={{ color: 'var(--gold-light)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', fontFamily: "'Outfit',sans-serif" }}>
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', marginTop: '24px' }}>
          By continuing, you agree to Royal Dine's Terms of Service
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
