import Landing from "./pages/Landing.js";
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout.js";

function App() {

  const userRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element= { <RootLayout />}>
        <Route index element = { <Landing /> } />
      </Route>
    )
  ) 

  return (
    <div>
      <RouterProvider router={userRouter}/>
    </div>
  );
}

export default App;
