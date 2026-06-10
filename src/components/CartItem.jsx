// components/CartItem.jsx - Single item row in the cart with quantity control & remove
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '../redux/cartSlice'
import '../styles/CartItem.css'

/**
 * CartItem
 * Props:
 *   item {object} - { id, title, price, thumbnail, quantity }
 */
export default function CartItem({ item }) {
  const dispatch = useDispatch()

  function handleDecrement() {
    // Minimum quantity is 1 — enforced in Redux reducer too
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
    }
  }

  function handleIncrement() {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
  }

  function handleRemove() {
    dispatch(removeFromCart(item.id))
  }

  return (
    <li className="cart-item">
      {/* Lazy-loaded thumbnail */}
      <img src={item.thumbnail} alt={item.title} className="cart-item-img" loading="lazy" />

      <div className="cart-item-info">
        <h3 className="cart-item-title">{item.title}</h3>
        <span className="cart-item-price">${item.price.toFixed(2)} each</span>
      </div>

      {/* Quantity adjuster — quantity cannot go below 1 */}
      <div className="cart-item-qty">
        <button
          className="qty-btn"
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="qty-value" aria-live="polite">{item.quantity}</span>
        <button className="qty-btn" onClick={handleIncrement} aria-label="Increase quantity">
          +
        </button>
      </div>

      <span className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>

      {/* Remove button */}
      <button className="btn-remove" onClick={handleRemove} aria-label={`Remove ${item.title}`}>
        🗑
      </button>
    </li>
  )
}
