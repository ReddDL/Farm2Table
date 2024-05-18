import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';

function App() {
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token;
  const [user, setUser] = useState();
 
  useEffect(() => {
    if (token) {
      setUser(jwtDecode(token))
    }
  }, [token])
  
  console.log({ user })

  return (
    <Router>
      <Routes>
        {
          // if user is not signed in (token is null/undefined)
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
            user?.userType === "admin" ? (
              <Route element={<AdminLayout />} context={user?.userId}>
                <Route path="/" element={<Landing />}/>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path='/admin/users' element={<AdminUsers/>} />
              </Route>
            ) : (
              // customer routes
              user?.userType === "customer" &&
              <Route element = {<UserLayout />} context={user?.userId}>
                <Route path = '/' element = {<Landing/>} /> 
                <Route path = '/products' element = {<UserProducts />}/>
                <Route path ='/cart' element = {<UserCart />} />
                <Route path ='/profile' element = {<UserProfile />} />
              </Route>
            )
          )
        }
      
        {/* Page Not Found */}
        <Route path="*" element={<NoPage />} context={user?.userType}/>
      </Routes>
    </Router>
  );
}

export default App;
