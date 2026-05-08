import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../api'

const FOOD_EMOJIS = {
  burger: '🍔',
  pizza: '🍕',
  rice: '🍚',
  chicken: '🍗',
  biryani: '🍛',
  soup: '🥣',
  salad: '🥗',
  pasta: '🍝',
  dessert: '🍮',
  drink: '🥤',
  bread: '🥖',
  fish: '🐟',
  beef: '🥩',
  default: '🍴',
}

function getEmoji(name = '', category = '') {
  const text = (name + ' ' + category).toLowerCase()
  for (const [key, emoji] of Object.entries(FOOD_EMOJIS)) {
    if (text.includes(key)) return emoji
  }
  return FOOD_EMOJIS.default
}

function SkeletonCard() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '18px', overflow: 'hidden' }}>
      <div className="skeleton" style={{ height: '200px' }} />
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="skeleton" style={{ height: '12px', width: '60%' }} />
        <div className="skeleton" style={{ height: '20px', width: '80%' }} />
        <div className="skeleton" style={{ height: '14px', width: '100%' }} />
      </div>
    </div>
  )
}

function FoodCard({ item }) {
  const { addItem, lastAdded } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)

  const categoryName = item.menu_categories?.name || item.category || 'Other'
  const emoji = getEmoji(item.name, categoryName)

  const handleAdd = () => {
    if (!user) {
      alert('Please login first to add items to cart.')
      navigate('/auth')
      return
    }

    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      emoji,
      category: categoryName,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  const isJustAdded = lastAdded === item.id || added

  return (
    <div className="card anim-fadeUp" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        height: '190px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.06), rgba(20,16,40,0.9))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
          />
        ) : (
          <span className="anim-float" style={{ fontSize: '64px', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}>
            {emoji}
          </span>
        )}

        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(7,9,15,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--gold)',
          fontSize: '10px',
          fontWeight: 600,
          padding: '4px 10px',
          borderRadius: '999px',
          fontFamily: "'JetBrains Mono',monospace",
          letterSpacing: '0.08em',
        }}>
          {categoryName}
        </span>

        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(7,9,15,0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 10px',
          borderRadius: '999px',
          fontSize: '12px',
        }}>
          <span style={{ color: '#F6C90E' }}>★</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: "'JetBrains Mono',monospace" }}>
            {item.rating || '4.8'}
          </span>
        </div>
      </div>

      <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.2 }}>
          {item.name}
        </h3>

        {item.description && (
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '13px',
            lineHeight: 1.6,
            marginBottom: '14px',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {item.description}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
          <span className="text-gold" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 700 }}>
            Rs {Number(item.price).toLocaleString()}
          </span>

          <button
            onClick={handleAdd}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '11px',
              border: 'none',
              background: isJustAdded ? 'linear-gradient(135deg,#52D48A,#2EBA6D)' : 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
              color: '#07090F',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all .25s',
              fontSize: '18px',
              transform: isJustAdded ? 'scale(1.1)' : 'scale(1)',
              boxShadow: isJustAdded ? '0 4px 16px rgba(82,212,138,0.35)' : '0 4px 16px rgba(201,168,76,0.25)',
            }}
          >
            {isJustAdded ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Menu() {
  const [items, setItems] = useState([])
  const [cats, setCats] = useState([])
  const [activecat, setActiveCat] = useState('all')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const menuRes = await api.get('/menu')
        const menuData = Array.isArray(menuRes.data) ? menuRes.data : menuRes.data.data || []

        setItems(menuData)

        const uniqueCats = [
          ...new Map(
            menuData.map(item => {
              const name = item.menu_categories?.name || item.category || 'Other'
              return [name.toLowerCase(), { id: item.category_id || name, name }]
            })
          ).values()
        ]

        setCats(uniqueCats)
        setError('')
      } catch (err) {
        console.log(err)
        setError('Menu could not load. Please check backend is running on port 5000.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const filtered = useMemo(() => {
    let list = items

    if (activecat !== 'all') {
      list = list.filter(i => {
        const categoryName = i.menu_categories?.name || i.category || 'Other'
        return categoryName.toLowerCase() === activecat
      })
    }

    if (search.trim()) {
      list = list.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    }

    return list
  }, [items, activecat, search])

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 0',
        textAlign: 'center',
        marginBottom: '48px',
      }}>
        <p className="anim-fadeUp" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', letterSpacing: '0.25em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Our Offerings
        </p>

        <h1 className="anim-fadeUp d100" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,6vw,64px)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
          The Royal Menu
        </h1>

        <p className="anim-fadeUp d200" style={{ color: 'var(--text-secondary)', fontSize: '16px', marginTop: '14px', maxWidth: '520px', margin: '14px auto 0' }}>
          Every dish crafted with passion, plated with precision
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="anim-fadeUp d200" style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
            <input
              className="input-field"
              style={{ paddingLeft: '20px' }}
              placeholder="Search dishes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveCat('all')}
              className={activecat === 'all' ? 'btn-primary' : 'btn-outline'}
              style={{ padding: '10px 18px', fontSize: '13px' }}
            >
              All
            </button>

            {cats.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.name.toLowerCase())}
                className={activecat === cat.name.toLowerCase() ? 'btn-primary' : 'btn-outline'}
                style={{ padding: '10px 18px', fontSize: '13px' }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {!loading && (
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: "'JetBrains Mono',monospace", marginBottom: '24px' }}>
            {filtered.length} dish{filtered.length !== 1 ? 'es' : ''} {search ? `matching "${search}"` : ''}
          </p>
        )}

        {error && (
          <div style={{ background: 'rgba(239,107,107,0.08)', border: '1px solid rgba(239,107,107,0.2)', borderRadius: '12px', padding: '16px', marginBottom: '24px', color: 'var(--error)', fontSize: '14px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : filtered.length === 0
              ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', color: 'var(--text-secondary)' }}>
                    No dishes found
                  </p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
                    Try a different search or category
                  </p>
                </div>
              )
              : filtered.map((item, i) => (
                <div key={item.id} style={{ animationDelay: `${(i % 8) * 60}ms` }}>
                  <FoodCard item={item} />
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}