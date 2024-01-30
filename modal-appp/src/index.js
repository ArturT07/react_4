import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart'; 
import Favorite from './components/Favorite'; 
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorite />} />
    </Routes>
  </Router>
</Provider>,
  document.getElementById('root')
);
