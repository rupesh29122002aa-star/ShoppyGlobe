// components/Checkout.jsx - Dummy checkout form + cart summary + order placement
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice'
import '../styles/Checkout.css'

/**
 * Checkout
 * - Collects user details via a form
 * - Shows cart summary
 * - On "Place Order": shows confirmation, clears cart, redirects to Home
 */
export default function Checkout() {
  const items    = useSelector(selectCartItems)
  const total    = useSelector(selectCartTotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', zip: '',
  })
  const [errors,   setErrors]   = useState({})
  const [ordered,  setOrdered]  = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Simple client-side validation
  function validate() {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required.'
    if (!form.email.trim())   e.email   = 'Email is required.'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.phone.trim())   e.phone   = 'Phone is required.'
    if (!form.address.trim()) e.address = 'Address is required.'
    if (!form.city.trim())    e.city    = 'City is required.'
    if (!form.zip.trim())     e.zip     = 'ZIP code is required.'
    return e
  }

  function handlePlaceOrder() {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }

    // Show confirmation, clear cart, then redirect to Home after 2.5 s
    setOrdered(true)
    dispatch(clearCart())
    setTimeout(() => navigate('/'), 2500)
  }

  // Redirect guard: if cart is empty and not just ordered
  if (items.length === 0 && !ordered) {
    return (
      <div className="checkout-empty">
        <h2>No items to checkout</h2>
        <button className="btn-back" onClick={() => navigate('/')}>Go Shopping</button>
      </div>
    )
  }

  // Order success screen
  if (ordered) {
    return (
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h2>Order placed!</h2>
        <p>Thanks, <strong>{form.name}</strong>! Your order is confirmed.</p>
        <p className="redirect-note">Redirecting you to the home page…</p>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-heading">Checkout</h1>

      <div className="checkout-layout">
        {/* ── User details form ── */}
        <section className="checkout-form-section">
          <h2>Delivery Details</h2>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Jane Smith" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input id="address" name="address" type="text" value={form.address} onChange={handleChange} placeholder="123 Main Street" />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" value={form.city} onChange={handleChange} placeholder="Mumbai" />
              {errors.city && <span className="field-error">{errors.city}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="zip">ZIP / Postal Code</label>
              <input id="zip" name="zip" type="text" value={form.zip} onChange={handleChange} placeholder="400001" />
              {errors.zip && <span className="field-error">{errors.zip}</span>}
            </div>
          </div>
        </section>

        {/* ── Order summary ── */}
        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <ul className="checkout-items">
            {items.map(item => (
              <li key={item.id} className="checkout-item">
                <img src={item.thumbnail} alt={item.title} loading="lazy" />
                <div>
                  <p>{item.title}</p>
                  <p className="checkout-item-qty">Qty: {item.quantity}</p>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          {/* Place Order button */}
          <button className="btn-place-order" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </aside>
      </div>
    </div>
  )
}
