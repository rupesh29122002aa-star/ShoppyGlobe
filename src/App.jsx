// App.jsx - Root component: sets up React Router with createBrowserRouter
import React, { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Header from './components/Header'
import './styles/global.css'

// ── Lazy-load all page-level components for code splitting ──────────────────
const ProductList  = lazy(() => import('./components/ProductList'))
const ProductDetail = lazy(() => import('./components/ProductDetail'))
const Cart         = lazy(() => import('./components/Cart'))
const Checkout     = lazy(() => import('./components/Checkout'))
const NotFound     = lazy(() => import('./components/NotFound'))

// Shared layout with persistent Header + Suspense boundary
function RootLayout() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Suspense fallback={<div className="page-loader"><div className="spinner" /></div>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

// createBrowserRouter provides better data handling & future-proof features
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,           element: <ProductList /> },
      { path: 'product/:id',   element: <ProductDetail /> },   // dynamic route
      { path: 'cart',          element: <Cart /> },
      { path: 'checkout',      element: <Checkout /> },
      { path: '*',             element: <NotFound /> },        // 404 catch-all
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
