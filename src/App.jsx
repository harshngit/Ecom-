import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, } from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Nopage from './pages/nopage/Nopage'
import MyState from './context/data/myState';
import Allproducts from './pages/allproducts/Allproducts';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import Productinfo from './pages/productinfo/Productinfo'
import Addproducts from './pages/admin/page/Addproducts';
import Updateproduct from './pages/admin/page/Updateproduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/allproducts' element={<Allproducts />}></Route>
            <Route path='/order' element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/dashboard' element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/productinfo/:id' element={<Productinfo />}></Route>
            <Route path='/addproduct' element={
              <ProtectedRouteForAdmin>
                <Addproducts />
              </ProtectedRouteForAdmin>
            }></Route>
            <Route path='/updateproduct' element={
              <ProtectedRouteForAdmin>
                <Updateproduct />
              </ProtectedRouteForAdmin>
            }></Route>
            <Route path='/*' element={<Nopage />}></Route>
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>


    </>
  )
}

export default App

//user

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

// admin

const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  if (admin.user.email === 'hphrgaming@gmail.com') {
    return children
  } else {
    return <Navigate to={'/'} />
  }
}