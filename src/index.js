import React from 'react';
import ReactDOM from 'react-dom/client';
import { WeatherContextProvider } from './store/weatherContext';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherContextProvider>
      <App />
    </WeatherContextProvider>
  </React.StrictMode>
);
