import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function WelcomeScreen() {
  const { user } = useAuth()

  return (
    <div
      className="welcome-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #161022 0%, #07090F 70%)' }}
    >
      {/* Ambient particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
            background: 'var(--gold)',
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
            animation: `particle ${2 + Math.random() * 3}s ease-out ${Math.random() * 2}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}

      {/* Ring ornament */}
      <div className="relative mb-8">
        <svg className="logo-ring" width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="url(#goldRing)"
            strokeWidth="1"
            strokeDasharray="8 6"
          />
          <defs>
            <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E8C97A" />
              <stop offset="100%" stopColor="#9B7A2F" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center crown */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)', boxShadow: '0 0 40px rgba(201,168,76,0.5)' }}
          >
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '30px', fontWeight: 700, color: '#07090F' }}>
              R
            </span>
          </div>
        </div>
      </div>

      {/* Brand name */}
      <div className="text-center mb-3">
        <h1
          className="text-gold anim-fadeUp"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 700, letterSpacing: '0.06em' }}
        >
          Royal Dine
        </h1>
        <p
          className="anim-fadeUp d200"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.28em', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '6px' }}
        >
          Fine Dining · Delivered
        </p>
      </div>

      {/* Welcome message */}
      <div
        className="anim-fadeUp d400 mt-4 px-8 py-4 rounded-2xl text-center"
        style={{ background: 'var(--gold-faint)', border: '1px solid var(--border)' }}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Welcome back,</p>
        <p style={{ color: 'var(--gold-light)', fontWeight: 600, fontSize: '18px', marginTop: '2px' }}>
          {user?.name || 'Guest'}
        </p>
      </div>

      {/* Tagline */}
      <p
        className="anim-fadeUp d600 mt-6"
        style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontSize: '18px' }}
      >
        &ldquo;Exquisite flavours, at your door&rdquo;
      </p>

      {/* Progress bar */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full overflow-hidden"
        style={{ width: '160px', height: '2px', background: 'var(--surface)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg,#C9A84C,#E8C97A)',
            animation: 'progressFill 3.2s linear forwards',
          }}
        />
      </div>

      <style>{`
        @keyframes particle {
          0%   { transform:translateY(0) scale(1); opacity:.7; }
          100% { transform:translateY(-80px) scale(.2); opacity:0; }
        }
        @keyframes progressFill {
          from { width:0; }
          to   { width:100%; }
        }
      `}</style>
    </div>
  )
}
