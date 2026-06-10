// components/Cart.jsx - Displays all cart items with quantity controls and totals
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotal } from '../redux/cartSlice'
import CartItem from './CartItem'
import '../styles/Cart.css'

/**
 * Cart
 * - Reads items from Redux store
 * - Renders a CartItem for each entry (each gets unique key)
 * - Shows order summary and Checkout link
 */
export default function Cart() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <span className="empty-icon">🛒</span>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn-shop">Start Shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="cart-heading">Your Cart <span>({items.length} item{items.length !== 1 ? 's' : ''})</span></h1>

      <div className="cart-layout">
        {/* Cart item list — each CartItem has a unique key */}
        <ul className="cart-list" aria-label="Cart items">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>

        {/* Order summary sidebar */}
        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-rows">
            {items.map(item => (
              <div key={item.id} className="summary-row">
                <span>{item.title} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn-checkout">Proceed to Checkout →</Link>
          <Link to="/" className="btn-continue">← Continue Shopping</Link>
        </aside>
      </div>
    </div>
  )
}
