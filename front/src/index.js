import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { Buffer } from 'buffer'

window.Buffer = window.Buffer ?? Buffer

const root = createRoot(document.querySelector("#root"))

root.render(<App />)