// Entry point: wraps App with Redux store Provider
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provide Redux store to entire application */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
