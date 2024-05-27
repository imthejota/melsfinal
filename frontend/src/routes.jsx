import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import Ordenes from "./pages/Ordenes";
import Home from "./pages/Home";
import Productos from "./pages/Productos";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "ordenes",
        element: <Ordenes />,
      },
      {
        path: "productos",
        element: <Productos />,
      },
    ],
  },
]);

export default routes;
