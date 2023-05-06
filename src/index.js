import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import LoginPage from './component/pages/LoginPage';
import RegisterPage from './component/pages/RegisterPage';
import ProductPage from './component/pages/ProductPage';
import AddProductPage from './component/pages/AddProductPage';
import Product from './component/products/Product';
import Order from './component/orders/Order';
import ModifyProduct from './component/products/ModifyProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<RegisterPage />} />
        <Route path="home" element={<ProductPage />} />
        <Route path="home/:message" element={<ProductPage />} />
        <Route path="addProduct" element={<AddProductPage />} />
        <Route path="products/detail/:productId" element={<Product />} />
        <Route path="product/modify/:productId" element={<ModifyProduct />} />
        <Route path="order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  , root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
