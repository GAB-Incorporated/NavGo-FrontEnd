import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"
import ModalTest from "../pages/ModalTest";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Subhome from "../pages/Subhome"
import Mural from "../pages/Mural";
import InteractiveMap from "../pages/InteractiveMap";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/test",
        element: <ModalTest/>
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/register/:choosedTool",
        element: <Register/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login/:choosedTool",
        element: <Login/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/dashboard",
        element: <Dashboard/>
    },
    {
        path: "/subhome",
        element: <Subhome/>
    },
    {
        path: "/mural",
        element: <Mural/>
    },
    {
        path: "/map",
        element: <InteractiveMap/>
    }
]) 

const Routes = () => {
    return <RouterProvider router={router}/>
}

export default Routes;
