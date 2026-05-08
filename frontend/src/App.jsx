import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import WelcomeScreen from './components/WelcomeScreen'
import Home from './pages/Home'
import Menu from './pages/Menu'
import AuthPage from './pages/AuthPage'
import Checkout from './pages/Checkout'
import Tracking from './pages/Tracking'
import Offers from './pages/Offers'
import NewArrivals from './pages/NewArrivals'
import ChefPicks from './pages/ChefPicks'
import About from './pages/About'
import Careers from './pages/Careers'
import Press from './pages/Press'
import Blog from './pages/Blog'
import HelpCentre from './pages/HelpCentre'
import RefundPolicy from './pages/RefundPolicy'
import ContactUs from './pages/ContactUs'
import ScrollToTop from './components/ScrollToTop'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsService from './pages/TermsService'
import CookiePolicy from './pages/CookiePolicy'

function Guard({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null

  return user ? children : <Navigate to="/auth" replace />
}

function Layout() {
  const { showWelcome, user } = useAuth()

  return (
    <>
      {showWelcome && <WelcomeScreen />}

      <Navbar />
      {user && <CartDrawer />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Guard><Menu /></Guard>} />
          <Route path="/checkout" element={<Guard><Checkout /></Guard>} />
          <Route path="/track/:id" element={<Guard><Tracking /></Guard>} />

          <Route path="/auth" element={user ? <Navigate to="/menu" replace /> : <AuthPage />} />

          <Route path="/offers" element={<Offers />} />
          <Route path="/new-arrivals" element={<NewArrivals />} />
          <Route path="/chef-picks" element={<ChefPicks />} />

          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/help" element={<HelpCentre />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-service" element={<TermsService />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <AuthProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}