// hooks/useFetchProducts.js - Custom hook to fetch all products from DummyJSON API
import { useState, useEffect } from 'react'

const API_URL = 'https://dummyjson.com/products?limit=30'

/**
 * useFetchProducts
 * Returns { products, loading, error }
 * Fetches on mount; handles loading and error states gracefully.
 */
export function useFetchProducts() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    let cancelled = false // prevent state update on unmounted component

    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`HTTP error — status ${res.status}`)
        const data = await res.json()
        if (!cancelled) setProducts(data.products)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load products.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProducts()

    // Cleanup: cancel stale updates if component unmounts
    return () => { cancelled = true }
  }, [])

  return { products, loading, error }
}
