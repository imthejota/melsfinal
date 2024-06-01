import express from "express";
import cors from "cors";
import connected from "./database/connect.js";
import routerProduct from "./routes/product.js";
import routerOrder from "./routes/order.js";

const app = express();
const callback = () =>
  console.log(`Server running on http://localhost:${app.get("port")}`);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
app.use(connected);
app.use("/productos", routerProduct);
app.use("/ordenes", routerOrder);
app.listen(app.get("port"), callback);
