import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import axios from 'axios';

import Landing from './pages/Landing';
import RootLayout from './RootLayout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import NoNav from './NoNav';
import AdminLayout from './AdminLayout.js';
import AdminDashboard from './pages/AdminDashboard.js';
import AdminProducts from './pages/AdminProducts.js';
import AdminOrders from './pages/AdminOrders.js';
import AdminUsers from './pages/AdminUsers.js';
import UserLayout from './components/user/UserLayout.js';
import UserProducts from './pages/user/UserProducts.js';
import UserCart from './pages/user/UserCart.js';
import UserProfile from './pages/user/UserProfile.js';
import NoPage from './pages/NoPage.js';

function App() {
  // get token from local storage
  const token = localStorage.getItem('token')
  // check if token is undefined
  const isLoggedIn = !!token;
  // user variable for info
  const [userType, setUserType] = useState();

  useEffect(() => {
    if (token) {
      const { userType, exp, ...rest } = jwtDecode(token);
      // clear localStorage if token is expired
      if (Date.now() > exp*1000) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // console.log(Date.now(), exp*1000, Date.now() > exp*1000)
      } else {
        setUserType(userType)
        // add default header for auth of requests
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
      }
    }
  }, [token])

  return (
    <Router>
      <Routes>
        {
          // if user is not signed in (token is undefined)
          !isLoggedIn ? (
            <>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Landing />} />
              </Route>
              <Route element={<NoNav />}>
                <Route path="/sign-in" element={<Signin />} />
                <Route path="/sign-up" element={<Signup />} />
              </Route>
            </>
          ) : (
            // if user is signed in
            userType === "admin" ? (
              // admin routes
              <Route element={<AdminLayout />} >
                <Route path="/" element={<Landing />}/>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path='/admin/users' element={<AdminUsers/>} />
              </Route>
            ) : (
              // customer routes
              userType === "customer" &&
              <Route element = {<UserLayout />} >
                <Route path="/" element = {<Landing/>} /> 
                <Route path="/products" element = {<UserProducts />}/>
                <Route path="/cart" element = {<UserCart />} />
                <Route path="/profile" element = {<UserProfile />} />
              </Route>
            )
          )
        }
      
        {/* Page Not Found */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
