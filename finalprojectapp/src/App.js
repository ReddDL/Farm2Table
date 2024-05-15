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
import UserLayout from './components/user/UserLayout.js';
import UserProducts from './pages/user/UserProducts.js';
import UserCart from './pages/user/UserCart.js';
import UserProfile from './pages/user/UserProfile.js';

function App() {
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
        <Route element = {<AdminLayout />}>
          <Route path = '/admin' element = {<Landing/>}> 
            <Route path = 'dashboard' element = {<AdminDashboard />} />
            <Route path = 'products' element = {<AdminProducts />}/>
            <Route path ='orders' element = {<AdminOrders />} />
          </Route>
        </Route>
        <Route element = {<UserLayout />}>
          <Route path = '/user' element = {<Landing/>} /> 
          <Route path = '/user/products' element = {<UserProducts />}/>
          <Route path ='/user/cart' element = {<UserCart />} />
          <Route path ='/user/profile' element = {<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
