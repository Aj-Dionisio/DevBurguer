import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { login } from './containers/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>
      Login
    </h1>
  </StrictMode>,
)
