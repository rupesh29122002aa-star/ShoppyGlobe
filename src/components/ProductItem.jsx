// components/ProductItem.jsx - Single product card with lazy-loaded image & Add to Cart
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, selectCartItems } from '../redux/cartSlice'
import '../styles/ProductItem.css'

/**
 * ProductItem
 * Props:
 *   product {object} - product data from DummyJSON API
 */
export default function ProductItem({ product }) {
  const dispatch   = useDispatch()
  const cartItems  = useSelector(selectCartItems)
  const [added, setAdded] = useState(false)

  // Check if this product is already in the cart
  const inCart = cartItems.some(item => item.id === product.id)

  function handleAddToCart() {
    dispatch(addToCart({
      id:        product.id,
      title:     product.title,
      price:     product.price,
      thumbnail: product.thumbnail,
    }))
    // Briefly show feedback
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article className="product-card">
      {/* Lazy-loaded product image */}
      <Link to={`/product/${product.id}`} className="card-img-link" aria-label={product.title}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="card-img"
          loading="lazy"          // native lazy loading
          width="300"
          height="220"
        />
      </Link>

      <div className="card-body">
        {/* Category badge */}
        <span className="card-category">{product.category}</span>

        {/* Product title links to detail page */}
        <Link to={`/product/${product.id}`} className="card-title-link">
          <h2 className="card-title">{product.title}</h2>
        </Link>

        {/* Rating */}
        <div className="card-rating" aria-label={`Rating: ${product.rating}`}>
          {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
          <span className="rating-value">{product.rating}</span>
        </div>

        <div className="card-footer">
          <span className="card-price">${product.price.toFixed(2)}</span>

          {/* Add to Cart button */}
          <button
            className={`btn-add ${added ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            {added ? '✓ Added' : inCart ? '+ More' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}
