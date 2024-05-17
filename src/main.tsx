import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем createRoot из react-dom/client
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './app/store';
import './index.css';

// Обновляем метод рендеринга на createRoot
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}
