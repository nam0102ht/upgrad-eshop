import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import Product from './component/products/Product';
import Order from './component/orders/Order';
import ModifyProduct from './component/products/ModifyProduct';
import Products from './component/products/Products';
import { Login } from '@mui/icons-material';
import Register from './component/register/Register';
import AddProduct from './component/products/AddProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="home" element={<Products/>} />
        <Route path="home/:message" element={<Products />} />
        <Route path="addProduct" element={<AddProduct />} />
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
