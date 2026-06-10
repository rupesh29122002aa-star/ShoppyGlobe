// components/NotFound.jsx - 404 page for unknown routes
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/NotFound.css'

/**
 * NotFound
 * Displays a clear 404 error with the attempted path and navigation options.
 */
export default function NotFound() {
  const location = useLocation()

  return (
    <div className="not-found">
      <div className="not-found-code">404</div>

      <h1 className="not-found-title">Page not found</h1>

      <p className="not-found-detail">
        The page at <code className="not-found-path">{location.pathname}</code> does not exist.
      </p>

      <p className="not-found-hint">
        It may have been moved, deleted, or you might have mistyped the URL.
      </p>

      <div className="not-found-actions">
        <Link to="/" className="btn-home">← Go to Home</Link>
        <Link to="/cart" className="btn-cart-link">View Cart</Link>
      </div>
    </div>
  )
}
