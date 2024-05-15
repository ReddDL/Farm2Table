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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="user" element={<Landing />} />
        </Route>
        <Route path="/" element={<NoNav />}>
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="landing" element={<Landing />}/>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
