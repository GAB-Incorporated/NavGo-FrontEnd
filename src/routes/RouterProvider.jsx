import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"
import Register from "../components/RegisterUser/registerForm";
import Login from "../components/LoginUser/loginForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
    
]) 

const Routes = () => {
    return <RouterProvider router={router}/>
}

export default Routes;