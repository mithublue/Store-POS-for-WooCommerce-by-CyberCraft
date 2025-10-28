import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css'

const rootElement = document.getElementById('store-pos-app') || document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} else {
  // eslint-disable-next-line no-console
  console.error('Store POS root element not found')
}
