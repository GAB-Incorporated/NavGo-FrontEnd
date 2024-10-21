import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"
import ModalTest from "../pages/ModalTest";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
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
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/admDashboard",
        element: <AdminDashboard/>
    },
    {
        path: "/subhome",
        element: <Subhome/>
    },
    {
        path: "/mural",
        element: <Mural/>
    },
        path: "/map",
        element: <InteractiveMap/>
    }
]) 

const Routes = () => {
    return <RouterProvider router={router}/>
}

export default Routes;
