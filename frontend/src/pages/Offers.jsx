import React from 'react'

const offers = [
  {
    title: 'Buy 1 Get 1 Free Burger',
    desc: 'Order one premium zinger burger and get another absolutely free.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
    tag: 'Hot Deal',
  },
  {
    title: '20% Off All Pizzas',
    desc: 'Enjoy cheesy hand-tossed pizzas with a limited-time discount.',
    img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
    tag: 'Pizza Week',
  },
  {
    title: 'Free Drink with Biryani',
    desc: 'Get a chilled drink free with every Royal Biryani order.',
    img: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=1200&auto=format&fit=crop',
    tag: 'Desi Special',
  },
  {
    title: 'Family Feast Deal',
    desc: 'A complete family meal with burgers, pizza, fries, and drinks.',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
    tag: 'Family',
  },
  {
    title: 'Free Dessert Above Rs 3000',
    desc: 'Complete your royal dinner with a complimentary sweet dessert.',
    img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1200&auto=format&fit=crop',
    tag: 'Dessert',
  },
  {
    title: 'Weekend BBQ Deal',
    desc: 'Smoky BBQ platter with sauces, salad, naan, and drinks.',
    img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200&auto=format&fit=crop',
    tag: 'Weekend',
  },
]

export default function Offers() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px', color: 'white' }}>
      <section style={{ maxWidth: 1200, margin: '0 auto 50px', textAlign: 'center' }}>
        <p style={{ color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Royal Deals</p>
        <h1 style={{ fontSize: 'clamp(42px,7vw,76px)', fontFamily: "'Cormorant Garamond',serif" }}>
          Special Offers
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 650, margin: '16px auto' }}>
          Premium food experiences with exclusive Royal Dine discounts.
        </p>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 24 }}>
        {offers.map((offer, i) => (
          <div key={i} className="card" style={{ overflow: 'hidden' }}>
            <img src={offer.img} alt={offer.title} style={{ width: '100%', height: 210, objectFit: 'cover' }} />
            <div style={{ padding: 24 }}>
              <span style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 700 }}>{offer.tag}</span>
              <h2 style={{ marginTop: 10, fontSize: 25 }}>{offer.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{offer.desc}</p>
              <button
  className="btn-primary"
  style={{ marginTop: 18 }}
  onClick={() => {

    const toast = document.createElement('div')

    toast.innerText = `Royal Dine: ${offer.title} claimed successfully!`

    toast.style.position = 'fixed'
    toast.style.top = '50%'
    toast.style.left = '50%'
    toast.style.transform = 'translate(-50%, -50%)'
    toast.style.background = '#C9A84C'
    toast.style.color = '#000'
    toast.style.padding = '18px 28px'
    toast.style.borderRadius = '14px'
    toast.style.fontWeight = 'bold'
    toast.style.fontSize = '16px'
    toast.style.zIndex = '9999'
    toast.style.boxShadow = '0 10px 40px rgba(0,0,0,0.4)'

    document.body.appendChild(toast)

    setTimeout(() => {
      toast.remove()
    }, 2500)
  }}
>
  Claim Offer
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}