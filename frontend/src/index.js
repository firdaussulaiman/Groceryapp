import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';


// Routes
import Home from './page/Home';
import Login from './page/Login';
import ShoppingCart from './page/ShoppingCart';

import ProductDetails from './page/ProductDetails';

// Create a root instance using createRoot
const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />

        <Route path="/product/:productId" element={<ProductDetails />} />
      </Route>
    </Routes>
  </Router>
);

reportWebVitals();
