import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// 빌드 시 미리 렌더링된 HTML이 있으면 이어받고, 개발 서버에서는 새로 그립니다.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
