import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Register from './register/Register';
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Login from './login/Login';
import Products from './products/Products';
import AddProduct from './products/AddProduct';
import Product from './products/Product';
import ModifyProduct from './products/ModifyProduct';
import Order from './orders/Order';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: "#F9F4F3"
    }
  },
});

function App() {
  var dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const isLoggedIn = Object.keys(user).length !== 0;
  const sessionUser = localStorage.getItem('user');
  if(!isLoggedIn && sessionUser !== null) {
    dispatch({type: 'login', payload: JSON.parse(sessionUser)});
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="App">
            <Routes>
              <Route path="/" element={ <Navigate to="/home" />} />
              <Route path="/login" element={<Login />} />
              <Route path="signup" element={<Register />} />
              <Route path="home" element={<Products />} />
              <Route path="home/:message" element={<Products />} />
              <Route path="addProduct" element={<AddProduct />} />
              <Route path="products/detail/:productId" element={<Product />} />
              <Route path="product/modify/:productId" element={<ModifyProduct />} />
              <Route path="order" element={<Order />} />
            </Routes>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;