import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createNightowl } from '@bufferhead/nightowl'

createNightowl({
    defaultMode: 'dark',
    toggleButtonMode: 'newState'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
