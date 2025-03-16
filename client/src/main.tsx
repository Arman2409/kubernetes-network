import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@coreui/coreui/dist/css/coreui.min.css'
import './styles/main/index.scss'
import "./styles/main/config.css"

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
