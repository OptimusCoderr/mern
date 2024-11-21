import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../components/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "/cart",
          element: <CartPage/>,
        },
        {
            path: "/about",
            element: <div>About Page</div>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
        {
          path: "/checkout",
          element: <CheckoutPage/>,
        },

      ]
    },
  ]);

  export default router;