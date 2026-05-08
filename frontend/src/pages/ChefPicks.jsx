import React from 'react'
import { useCart } from '../context/CartContext'

const picks = [
  {
    id: 'chef-1',
    title: 'Royal Biryani',
    desc: 'Signature basmati rice with tender chicken and royal spices.',
    img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1200&auto=format&fit=crop',
    price: 1200,
  },
  {
    id: 'chef-2',
    title: 'Premium Burger',
    desc: 'Juicy patty, cheddar, fresh bun, and secret royal sauce.',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    price: 950,
  },
  {
    id: 'chef-3',
    title: 'BBQ Platter',
    desc: 'Charcoal-grilled kebabs, tikka, wings, naan, and chutney.',
    img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200&auto=format&fit=crop',
    price: 1800,
  },
]

export default function ChefPicks() {
  const { addItem } = useCart()

  const handleOrder = (item) => {
    addItem({
      id: item.id,
      name: item.title,
      price: item.price,
      image_url: item.img,
      emoji: '👨‍🍳',
      category: 'Chef Pick',
    })

    const toast = document.createElement('div')

toast.innerText = `Royal Dine: ${item.title} added to cart successfully!`

toast.style.position = 'fixed'
toast.style.top = '50%'
toast.style.left = '50%'
toast.style.transform = 'translate(-50%, -50%)'
toast.style.background = '#C9A84C'
toast.style.color = '#000'
toast.style.padding = '16px 24px'
toast.style.borderRadius = '12px'
toast.style.fontWeight = 'bold'
toast.style.zIndex = '9999'
toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'

document.body.appendChild(toast)

setTimeout(() => {
  toast.remove()
}, 3000)
  }

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ color: 'var(--gold)', letterSpacing: '0.25em' }}>
          CURATED BY CHEF
        </p>

        <h1 style={{ fontSize: 'clamp(42px,7vw,76px)', fontFamily: "'Cormorant Garamond',serif" }}>
          Chef’s Picks
        </h1>

        {picks.map((item, i) => (
          <div
            key={item.id}
            className="card"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
              gap: 24,
              overflow: 'hidden',
              marginTop: 28,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{ width: '100%', height: 300, objectFit: 'cover' }}
            />

            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: 'var(--gold)' }}>
                Chef Recommendation #{i + 1}
              </span>

              <h2 style={{ fontSize: 34 }}>{item.title}</h2>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {item.desc}
              </p>

              <h3 style={{ color: 'var(--gold)', marginTop: 10 }}>
                Rs {item.price}
              </h3>

              <button
                className="btn-primary"
                style={{ marginTop: 20, width: 150 }}
                onClick={() => handleOrder(item)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}