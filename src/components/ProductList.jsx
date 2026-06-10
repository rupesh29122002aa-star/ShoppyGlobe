// components/ProductList.jsx - Fetches and displays products; search via Redux state
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFetchProducts } from '../hooks/useFetchProducts'
import { selectSearchQuery, setSearchQuery } from '../redux/searchSlice'
import ProductItem from './ProductItem'
import '../styles/ProductList.css'

/**
 * ProductList
 * - Uses custom hook useFetchProducts to load products on mount
 * - Filters products using the Redux search query
 * - Renders a grid of ProductItem components
 */
export default function ProductList() {
  const { products, loading, error } = useFetchProducts()
  const dispatch    = useDispatch()
  const searchQuery = useSelector(selectSearchQuery)

  // Filter products based on Redux search query (case-insensitive)
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section className="product-list-page">
      {/* Hero banner */}
      <div className="hero">
        <h1 className="hero-title">Discover Everything</h1>
        <p className="hero-sub">Quality products, delivered to your door.</p>

        {/* Search bar — updates Redux search state */}
        <div className="search-wrap">
          <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search products or categories…"
            value={searchQuery}
            onChange={e => dispatch(setSearchQuery(e.target.value))}
            aria-label="Search products"
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => dispatch(setSearchQuery(''))} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="state-container">
          <div className="spinner large" />
          <p>Loading products…</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="state-container error-state">
          <span className="error-icon">⚠️</span>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <p className="error-hint">Check your connection and refresh the page.</p>
        </div>
      )}

      {/* Empty search result */}
      {!loading && !error && filtered.length === 0 && (
        <div className="state-container">
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <h2>No products found</h2>
          <p>Try a different search term.</p>
        </div>
      )}

      {/* Product grid — each item gets a unique key */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="results-count">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
          <div className="product-grid">
            {filtered.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
