import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/index.css";
import { QueryClient,
    QueryClientProvider} from "@tanstack/react-query"
import routes from "./routes";

const queryClient = new QueryClient()
const $root = document.getElementById("root");

const app = createRoot($root);

app.render(
    <QueryClientProvider client={queryClient}>
<RouterProvider router={routes} />
</QueryClientProvider>
);
