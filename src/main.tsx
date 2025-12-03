import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Error trap for debugging
window.onerror = function (message, source, lineno, colno, error) {
  const root = document.getElementById('root') || document.body;
  root.innerHTML += `<div style="color: red; padding: 20px; background: #fff; z-index: 9999; position: relative;">
    <h1>Runtime Error</h1>
    <pre>${message}</pre>
    <pre>${source}:${lineno}:${colno}</pre>
    <pre>${error?.stack}</pre>
  </div>`;
};

try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (e: any) {
  document.body.innerHTML += `<div style="color: red; padding: 20px; background: #fff;"><h1>Render Error</h1><pre>${e?.message || e}</pre></div>`;
}
