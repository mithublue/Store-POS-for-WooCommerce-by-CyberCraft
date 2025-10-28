import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/tailwind.css'

const rootElement = document.getElementById('store-pos-app') || document.getElementById('root')

if (!rootElement) {
  // eslint-disable-next-line no-console
  console.error('Store POS root element not found')
}

let root

const render = (Component = App) => {
  if (!rootElement) {
    return
  }

  if (!root) {
    root = ReactDOM.createRoot(rootElement)
  }

  root.render(
    <React.StrictMode>
      <Component />
    </React.StrictMode>,
  )
}

try {
  render()
} catch (error) {
  console.error('Failed to mount POS app:', error)
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 2rem; background: #fee; border: 1px solid #fcc; border-radius: 8px; margin: 1rem;">
        <h2 style="color: #c00; margin-bottom: 1rem;">Failed to load POS</h2>
        <p style="color: #666;">Error: ${error.message}</p>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #0056A7; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Reload Page
        </button>
      </div>
    `
  }
}

if (import.meta.hot) {
  import.meta.hot.accept('./App.jsx', (module) => {
    const NextApp = module?.default || App
    render(NextApp)
  })

  import.meta.hot.dispose(() => {
    if (root) {
      root.unmount()
      root = null
    }
  })
}
