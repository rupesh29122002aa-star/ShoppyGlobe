// redux/cartSlice.js - Actions, reducers, and selectors for cart state
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of { id, title, price, thumbnail, quantity }
  },
  reducers: {
    // Action: add product to cart or increment quantity if already present
    addToCart(state, action) {
      const product = action.payload
      const existing = state.items.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },

    // Action: remove a product entirely from the cart
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
    },

    // Action: update quantity; enforces minimum of 1
    updateQuantity(state, action) {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (item) {
        item.quantity = Math.max(1, quantity) // quantity never goes below 1
      }
    },

    // Action: empty the entire cart (used after order placement)
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// ── Selectors ────────────────────────────────────────────────────────────────
export const selectCartItems      = state => state.cart.items
export const selectCartCount      = state => state.cart.items.reduce((sum, i) => sum + i.quantity, 0)
export const selectCartTotal      = state =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

export default cartSlice.reducer
