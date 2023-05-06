import { createBrowserRouter } from "react-router-dom";
import Home from "../layouts/Home";
import Menu from "../layouts/Menu";
import Cart from "../layouts/Cart";
import { Login, Register } from "../components/LoginRegisterModule";
import LoginRegister from "../layouts/LoginRegister";
import Root from "../routes/Root";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root/>,
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: 'menu',
                element: <Menu/>
            }, 
            {
                path: 'cart',
                element: <Cart/>
            }
        ]
    },
    {
        path: '/',
        element: <LoginRegister/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            }
        ]
    }
])

export default router