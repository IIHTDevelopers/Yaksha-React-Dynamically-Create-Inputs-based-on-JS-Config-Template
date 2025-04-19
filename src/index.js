import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom';

// Render the app with BrowserRouter for routing
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
