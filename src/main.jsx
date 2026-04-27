import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Fallback caso o App falhe
const Root = () => {
  try {
    return (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erro crítico no App:", error);
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Algo deu errado no carregamento.</h1>
        <p>Verifique o console do navegador (F12) para detalhes.</p>
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
