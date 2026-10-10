import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export { profile, programs } from './data/site.js'
