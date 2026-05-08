import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

    const linkStyle = {
        color: 'var(--text-muted)',
        fontSize: '13px',
        textDecoration: 'none',
        transition: 'color .2s',
    }

    return (
        <footer style={{
            background: 'var(--bg-card)',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '80px'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '64px 24px 32px'
            }}>

                {/* Top row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '48px',
                    marginBottom: '56px'
                }}>

                    {/* Brand */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                background: 'linear-gradient(135deg,#C9A84C,#9B7A2F)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: "'Cormorant Garamond',serif",
                                fontWeight: 700,
                                fontSize: '22px',
                                color: '#07090F'
                            }}>
                                R
                            </div>

                            <div>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond',serif",
                                    fontWeight: 700,
                                    fontSize: '22px',
                                    letterSpacing: '0.04em',
                                    color: 'var(--text-primary)'
                                }}>
                                    Royal Dine
                                </div>

                                <div style={{
                                    fontFamily: "'JetBrains Mono',monospace",
                                    fontSize: '9px',
                                    color: 'var(--gold)',
                                    letterSpacing: '0.2em',
                                    textTransform: 'uppercase',
                                    marginTop: '1px'
                                }}>
                                    Fine Delivery
                                </div>
                            </div>
                        </div>

                        <p style={{
                            color: 'var(--text-muted)',
                            fontSize: '13px',
                            lineHeight: 1.7,
                            maxWidth: '240px'
                        }}>
                            Exquisite restaurant cuisine delivered with elegance to your doorstep.
                        </p>
                    </div>

                    {/* Discover */}
                    <div>
                        <h4 style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: '16px'
                        }}>
                            Discover
                        </h4>

                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <li><Link to="/menu" style={linkStyle}>Our Menu</Link></li>
                            <li><Link to="/offers" style={linkStyle}>Special Offers</Link></li>
                            <li><Link to="/new-arrivals" style={linkStyle}>New Arrivals</Link></li>
                            <li><Link to="/chef-picks" style={linkStyle}>Chef's Picks</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: '16px'
                        }}>
                            Company
                        </h4>

                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <li><Link to="/about" style={linkStyle}>About Us</Link></li>
                            <li><Link to="/careers" style={linkStyle}>Careers</Link></li>
                            <li><Link to="/press" style={linkStyle}>Press</Link></li>
                            <li><Link to="/blog" style={linkStyle}>Blog</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{
                            fontFamily: "'Cormorant Garamond',serif",
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: '16px'
                        }}>
                            Support
                        </h4>

                        <ul style={{
                            listStyle: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}>
                            <li><Link to="/help" style={linkStyle}>Help Centre</Link></li>
                            <li><Link to="/track/demo" style={linkStyle}>Track Order</Link></li>
                            <li><Link to="/refund-policy" style={linkStyle}>Refund Policy</Link></li>
                            <li><Link to="/contact" style={linkStyle}>Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    height: '1px',
                    background: 'var(--border-subtle)',
                    marginBottom: '24px'
                }} />

                {/* Bottom row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                }}>
                    <p style={{
                        color: 'var(--text-muted)',
                        fontSize: '12px'
                    }}>
                        © {new Date().getFullYear()} Royal Dine. All rights reserved.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '20px'
                    }}>
                        <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>

                        <Link to="/terms-service" style={linkStyle}>Terms of Service</Link>

                        <Link to="/cookie-policy" style={linkStyle}>Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}