import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Root = createRoot(document.getElementById('root'))

Root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
