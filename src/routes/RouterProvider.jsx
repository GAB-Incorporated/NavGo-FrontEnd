import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound"
import ModalTest from "../pages/ModalTest";
import ModalSubject from "../pages/ModalSubject";

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
        path: "/testSubjects",
        element: <ModalSubject/>
    }
]) 

const Routes = () => {
    return <RouterProvider router={router}/>
}

export default Routes;