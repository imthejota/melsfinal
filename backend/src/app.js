import express from "express";
import cors from "cors";

const app = express();
app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const callback = () =>
    console.log(`Server running on http://localhost:${app.get("port")}`);
app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), callback);
