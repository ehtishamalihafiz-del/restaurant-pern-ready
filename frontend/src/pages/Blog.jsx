import React from 'react'

export default function Blog() {
  const posts = [
    ['How we prepare fresh biryani daily', 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1200&auto=format&fit=crop'],
    ['Why food packaging matters in delivery', 'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop'],
    ['Top 5 dishes loved by customers', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop'],
  ]

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 64, fontFamily: "'Cormorant Garamond',serif" }}>Royal Dine Blog</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 35 }}>
          {posts.map(([title, img]) => (
            <div className="card" key={title} style={{ overflow: 'hidden' }}>
              <img src={img} style={{ width: '100%', height: 230, objectFit: 'cover' }} />
              <div style={{ padding: 24 }}>
                <h2>{title}</h2>
                <p style={{ color: 'var(--text-muted)' }}>Read our latest restaurant stories and food tips.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}