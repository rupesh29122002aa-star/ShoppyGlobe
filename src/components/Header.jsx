// components/Header.jsx - Navigation bar with cart badge and search is in ProductList
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../redux/cartSlice'
import '../styles/Header.css'

/**
 * Header - persistent top navigation
 * Props: none (reads cart count from Redux)
 */
export default function Header() {
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="header">
      <div className="header-inner">
        {/* Brand */}
        <Link to="/" className="brand">
          <span className="brand-icon">🛍</span>
          <span className="brand-name">ShoppyGlobe</span>
        </Link>

        {/* Navigation links */}
        <nav className="nav" aria-label="Main navigation">
          <NavLink to="/"        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end>
            Home
          </NavLink>
          <NavLink to="/cart"    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            {/* Cart icon with item count badge */}
            <span className="cart-link">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9"  cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Cart
              {cartCount > 0 && (
                <span className="cart-badge" aria-label={`${cartCount} items in cart`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
