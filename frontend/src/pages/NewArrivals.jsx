import React, { useState } from 'react'

const arrivals = [
  {
    title: 'Loaded Nachos',
    desc: 'Crispy nachos loaded with cheese, jalapenos, chicken, and sauces.',
    img: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Nachos', 'Cheese', 'Chicken', 'Jalapenos', 'Creamy sauce'],
    price: 'Rs 700',
    category: 'Starter',
  },
  {
    title: 'BBQ Wings',
    desc: 'Smoky glazed wings served with creamy garlic dip.',
    img: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Chicken wings', 'BBQ sauce', 'Garlic dip', 'Spices'],
    price: 'Rs 600',
    category: 'Starter',
  },
  {
    title: 'Alfredo Pasta',
    desc: 'Creamy white sauce pasta with grilled chicken and parmesan.',
    img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Pasta', 'Cream sauce', 'Chicken', 'Parmesan', 'Black pepper'],
    price: 'Rs 850',
    category: 'Main Course',
  },
  {
    title: 'Chocolate Lava Cake',
    desc: 'Warm chocolate cake with molten center and vanilla ice cream.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop',
    ingredients: ['Chocolate', 'Butter', 'Eggs', 'Flour', 'Vanilla ice cream'],
    price: 'Rs 550',
    category: 'Dessert',
  },
]

export default function NewArrivals() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(42px,7vw,76px)', fontFamily: "'Cormorant Garamond',serif" }}>
          New Arrivals
        </h1>

        <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
          Freshly added dishes from our Royal Dine kitchen.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(270px,1fr))', gap: 24 }}>
          {arrivals.map((item) => (
            <div className="card" key={item.title} style={{ overflow: 'hidden' }}>
              <img src={item.img} alt={item.title} style={{ width: '100%', height: 230, objectFit: 'cover' }} />

              <div style={{ padding: 24 }}>
                <h2>{item.title}</h2>

                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>

                <button
                  className="btn-outline"
                  style={{ marginTop: 16 }}
                  onClick={() => setSelected(item)}
                >
                  View Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="card"
            style={{
              maxWidth: 850,
              width: '100%',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
            }}
          >
            <img
              src={selected.img}
              alt={selected.title}
              style={{ width: '100%', height: '100%', minHeight: 360, objectFit: 'cover' }}
            />

            <div style={{ padding: 32 }}>
              <p style={{ color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {selected.category}
              </p>

              <h2 style={{ fontSize: 36, fontFamily: "'Cormorant Garamond',serif" }}>
                {selected.title}
              </h2>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                {selected.desc}
              </p>

              <h3 style={{ marginTop: 22 }}>Ingredients</h3>

              <ul style={{ color: 'var(--text-muted)', lineHeight: 2 }}>
                {selected.ingredients.map((ing) => (
                  <li key={ing}>✓ {ing}</li>
                ))}
              </ul>

              <h2 style={{ color: 'var(--gold)', marginTop: 20 }}>
                {selected.price}
              </h2>

              <button
                className="btn-primary"
                style={{ marginTop: 20 }}
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}