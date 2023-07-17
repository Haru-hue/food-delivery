import { createBrowserRouter } from "react-router-dom";
import Home from "../layouts/Home";
import Menu from "../layouts/Menu";
import Cart from "../layouts/Cart";
import { Login, Register } from "../components/LoginRegisterModule";
import Root from "../routes/Root";
import LoginRoot from "../routes/LoginRoot";
import Checkout from "../components/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      
    ],
  },
  {
    path: "/user",
    element: <LoginRoot/>,
    children: [
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register />,
      },
    ]
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
  
]);

export default router;
