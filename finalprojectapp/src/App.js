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
// import { parse } from 'dotenv';

/**
 * Returns a JS object representation of a Javascript Web Token from its common encoded
 * string form.
 *
 * @param {string} token a Javascript Web Token in base64 encoded, `.` separated form
 * @returns {(object | undefined)} an object-representation of the token
 * or undefined if parsing failed
 */
function getParsedJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (error) {
    return undefined
  }
}

function App() {
  const token = localStorage.getItem('token')
  const parsedToken = getParsedJwt(token)
  const { userId, userType } = parsedToken

  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route element={<NoNav />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Route>
        {
          // check if user is signed in (userId is not null/undefined)
          userId && (
            // check if user is admin
            userType === "admin" ? (
              // admin routes
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="landing" element={<Landing />}/>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path='users' element={<AdminUsers/>} />
              </Route>
            ) : (
              <Route element = {<UserLayout />}>
                <Route path = '/user' element = {<Landing/>} /> 
                <Route path = '/user/products' element = {<UserProducts />}/>
                <Route path ='/user/cart' element = {<UserCart />} />
                <Route path ='/user/profile' element = {<UserProfile />} />
              </Route>
            )
          )
        }
        
      </Routes>
    </Router>
  );
}

export default App;
