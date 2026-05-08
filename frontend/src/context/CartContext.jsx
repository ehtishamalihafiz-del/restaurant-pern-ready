import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rd_cart') || '[]') } catch { return [] }
  })
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    localStorage.setItem('rd_cart', JSON.stringify(items))
  }, [items])

  const addItem = (item) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === item.id)
      if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
    setLastAdded(item.id)
    setTimeout(() => setLastAdded(null), 800)
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const setQty = (id, qty) => {
    if (qty < 1) return removeItem(id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clear = () => setItems([])

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count    = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, setQty, clear, subtotal, count, open, setOpen, lastAdded }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
