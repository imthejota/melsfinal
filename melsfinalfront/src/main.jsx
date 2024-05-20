import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import routes from "./routes";

const $root = document.getElementById("root");

const app = createRoot($root);

app.render(<RouterProvider router={routes} />);
