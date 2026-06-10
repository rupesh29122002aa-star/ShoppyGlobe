// components/ProductDetail.jsx - Fetches & displays a single product by route param :id
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import '../styles/ProductDetail.css'

/**
 * ProductDetail
 * - Reads :id from route params
 * - Uses useEffect to fetch product details on mount / when id changes
 * - Handles loading and error states gracefully
 */
export default function ProductDetail() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const dispatch    = useDispatch()

  const [product,  setProduct]  = useState(null)
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [added,    setAdded]    = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  // Fetch product details when component mounts or id changes
  useEffect(() => {
    let cancelled = false

    async function fetchProduct() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`https://dummyjson.com/products/${id}`)
        if (!res.ok) {
          if (res.status === 404) throw new Error('Product not found.')
          throw new Error(`HTTP error — status ${res.status}`)
        }
        const data = await res.json()
        if (!cancelled) {
          setProduct(data)
          setActiveImg(0)
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load product.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProduct()
    return () => { cancelled = true }
  }, [id])

  function handleAddToCart() {
    dispatch(addToCart({
      id:        product.id,
      title:     product.title,
      price:     product.price,
      thumbnail: product.thumbnail,
    }))
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  if (loading) return (
    <div className="detail-state">
      <div className="spinner large" />
      <p>Loading product…</p>
    </div>
  )

  if (error) return (
    <div className="detail-state error-state">
      <span className="error-icon">⚠️</span>
      <h2>Oops!</h2>
      <p>{error}</p>
      <button className="btn-back" onClick={() => navigate('/')}>← Back to products</button>
    </div>
  )

  const images = product.images?.length ? product.images : [product.thumbnail]

  return (
    <div className="detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-layout">
        {/* Image gallery */}
        <div className="detail-gallery">
          <img
            src={images[activeImg]}
            alt={product.title}
            className="gallery-main"
            loading="lazy"
          />
          {images.length > 1 && (
            <div className="gallery-thumbs">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} view ${i + 1}`}
                  className={`gallery-thumb ${i === activeImg ? 'active' : ''}`}
                  loading="lazy"
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
            <span>{product.rating} / 5</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-meta">
            <div className="meta-row"><span>Brand</span><strong>{product.brand || '—'}</strong></div>
            <div className="meta-row"><span>Stock</span><strong>{product.stock} units</strong></div>
            <div className="meta-row"><span>Discount</span><strong>{product.discountPercentage}% off</strong></div>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <span className="detail-original">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          </div>

          <button
            className={`btn-detail-cart ${added ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
