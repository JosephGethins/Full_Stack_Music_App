import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' for newer React versions
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root for rendering

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
