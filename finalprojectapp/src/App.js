import Landing from "./pages/Landing.js";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import AdminLayout from "./AdminLayout.js";
import RootLayout from "./RootLayout.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import AdminProducts from "./pages/AdminProducts.js";
import AdminOrders from "./pages/AdminOrders.js";

function App() {

  const userRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element= { <RootLayout />}>
        <Route index element = { <Landing /> } />
      </Route>
    )
  ) 

  const adminRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element = {<AdminLayout />}>
        <Route index element = {<Landing/>} />
        <Route path = '/dashboard' element = {<AdminDashboard />} />
        <Route path = '/products' element = {<AdminProducts />}/>
        <Route path ='/orders' element = {<AdminOrders />} />
      </Route>
    )
  )

  return (
    <div>
      <RouterProvider router={adminRouter}/>
    </div>
  );
}

export default App;
