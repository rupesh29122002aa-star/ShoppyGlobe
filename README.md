# ShoppyGlobe 🛍

A full-featured e-commerce application built with **React + Vite**, **Redux Toolkit**, and **React Router v6**.

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

## Project Structure (frontend)

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




GIT-HUB LINK --  https://github.com/rupesh29122002aa-star/ShoppyGlobe

# Shoppyglobe E-commerce API 🛍️

A robust, production-ready backend RESTful API built for an e-commerce platform using Node.js, Express.js, and MongoDB. This project features full product cataloging, a secure shopping cart management system, custom validation rules, and JSON Web Token (JWT) user authentication.

---

## 🏗️ Folder Structure (BACKEND)
The project follows a clean MVC (Model-View-Controller) architectural pattern:

```text
shoppyglobe-backend/
├── config/
│   └── db.js              # MongoDB Atlas connection manager
├── controllers/
│   ├── authController.js   # Handles registration & JWT logins
│   ├── cartController.js   # Manages secure shopping cart actions
│   └── productController.js# Handles product retrieval
├── middleware/
│   └── authMiddleware.js   # Protects secure routes via JWT verification
├── models/
│   ├── Cart.js            # Shopping Cart database schema
│   ├── Product.js         # Product catalog database schema
│   └── User.js            # User authorization database schema
├── routes/
│   ├── authRoutes.js      # Auth route endpoint mapping
│   ├── cartRoutes.js      # Protected Cart route mappings
│   └── productRoutes.js   # Public Product route mappings
├── .env                   # Configuration environment variables
├── package.json           # Application scripts and dependencies
├── seed.js                # Product database population script
└── server.js              # Application entry point & Express setup
```

---

## 🛠️ Tech Stack & Dependencies
* **Runtime Environment:** Node.js (v24+)
* **Framework:** Express.js
* **Database Object Modeling:** Mongoose / MongoDB Atlas
* **Security & Authentication:** BcryptJS (Password hashing) & JSON Web Tokens (Token generation)
* **Process Manager:** Nodemon (Development hot-reloading)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
# Install required npm packages
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_signing_key_12345
```

### 3. Seed Database Samples
Populate your database collection with baseline mock data before running tests:
```bash
node seed.js
```

### 4. Run the Development Server
```bash
npm run dev
```

---

## 📡 API Endpoint Documentation

### 🔐 Authentication Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Registers a new user account |
| `POST` | `/auth/login` | Public | Validates credentials & returns a JWT |

### 📦 Product Catalog Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Public | Fetches all seeded store listings |
| `GET` | `/products/:id` | Public | Fetches complete detail for a single product |

### 🛒 Shopping Cart Routes (Protected)
*Note: All cart requests require an `Authorization: Bearer <JWT_TOKEN>` request header.*

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/cart` | Private | Adds an item to the user's cart (Validates stock) |
| `PUT` | `/cart/:id` | Private | Modifies an item quantity in the cart |
| `DELETE` | `/cart/:id`| Private | Removably purges an item array completely |

---

## 🧪 Validation & Error Handling Features
1. **Inventory Guardrail:** The API automatically checks inventory stock amounts before letting an authenticated user add a product to their shopping cart.
2. **Crash Prevention Middleware:** Express custom error handlers safely catch database mapping failures or bad request payloads, preventing server down-time.
3. **Route Sign-In Requirements:** Cart modification endpoints throw an immediate `401 Unauthorized` block if a missing or altered security token is passed.
