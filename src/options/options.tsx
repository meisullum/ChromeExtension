import React from 'react'
// import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import './options.css'

const text = <img src='icon.png' />

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(text)

