# ShoppyGlobe 🛍

A full-featured e-commerce application built with **React + Vite**, **Redux Toolkit**, and **React Router v6**.

## GitHub Repository

> **Repo link:** `https://github.com/<your-username>/shoppyglobe`
>
> _(Replace with your actual repository URL before submitting)_

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Vite | Build tool & dev server |
| React 18 | UI framework |
| Redux Toolkit | Global state (cart + search) |
| React Router v6 (`createBrowserRouter`) | Client-side routing |
| DummyJSON API | Product data source |

---

## Features

- **Product listing** — 30 products from `https://dummyjson.com/products` via a custom `useFetchProducts` hook
- **Product detail** — dynamic route `/product/:id` with full product info and image gallery
- **Search** — Redux-powered live filter on the home page
- **Cart** — add, remove, adjust quantities (min 1), order summary
- **Checkout** — form validation, cart summary, "Place Order" clears cart and redirects home
- **404 page** — friendly error with the attempted path displayed
- **Lazy loading** — all route-level components split with `React.lazy` + `Suspense`; images use native `loading="lazy"`
- **Responsive** — works on mobile, tablet, and desktop

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```

> **Note:** `node_modules` is excluded from this submission as required.

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── ProductList.jsx
│   ├── ProductItem.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── Checkout.jsx
│   └── NotFound.jsx
├── hooks/
│   └── useFetchProducts.js   ← custom data-fetching hook
├── redux/
│   ├── store.js
│   ├── cartSlice.js          ← actions, reducers, selectors
│   └── searchSlice.js        ← search query state
├── styles/
│   ├── global.css
│   ├── Header.css
│   ├── ProductList.css
│   ├── ProductItem.css
│   ├── ProductDetail.css
│   ├── Cart.css
│   ├── CartItem.css
│   ├── Checkout.css
│   └── NotFound.css
├── App.jsx                   ← createBrowserRouter setup
└── main.jsx                  ← Redux Provider + ReactDOM entry
```
