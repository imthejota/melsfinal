import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import Ordenes from "./pages/Ordenes"
import Home from "./pages/Home"

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Default />,
        children: [
            {
                index: true,
                element: <Home />,
            },{
                path: "ordenes",
                element: <Ordenes />
            },
        ],
    },
]);

export default routes;
