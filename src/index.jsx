// src/index.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import CssBaseline from "@mui/material/CssBaseline";

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </React.StrictMode>
)