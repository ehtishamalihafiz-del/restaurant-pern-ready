import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null)
  const [token, setToken]         = useState(null)
  const [loading, setLoading]     = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const t = localStorage.getItem('rd_token')
    const u = localStorage.getItem('rd_user')
    if (t && u) { try { setToken(t); setUser(JSON.parse(u)) } catch {} }
    setLoading(false)
  }, [])

  const login = (userData, tok) => {
    setUser(userData)
    setToken(tok)
    localStorage.setItem('rd_token', tok)
    localStorage.setItem('rd_user', JSON.stringify(userData))
    setShowWelcome(true)
    setTimeout(() => setShowWelcome(false), 3500)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('rd_token')
    localStorage.removeItem('rd_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, showWelcome }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
