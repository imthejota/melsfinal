import mongoose from "mongoose";

const dbUrl = process.env.MONGO_URI;

const connected = async (req, res, next) => {
  try {
    await mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.on("open", () => console.log("Database connect"));
    db.on("error", () => console.log("Database error connect"));
    next();
  } catch (error) {
    res.status(500).send("Error al conectar con la base de datos");
  }
};

export default connected;
