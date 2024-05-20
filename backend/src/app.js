import express from "express";
import cors from "cors";
import connect from "./database/connect";
import routerProduct from "./routes/product";

const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
app.use(connect);
const callback = () => `Server running on http://localhost:${app.get("port")}`;
app.use("/productos", routerProduct);
app.listen(app.get("port"), callback);
