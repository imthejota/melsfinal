import mongoose from "mongoose";

const dbUrl = "mongodb://localhost:27017/mels";
/* const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}; */

let isConnected;

const connectToDatabase = async () => {
    if (isConnected) {
        return;
    }
    try {
        await mongoose.connect(dbUrl);
        isConnected = true;
        console.log("Conectado a la BBDD");
    } catch (error) {
        console.error("Error de conexión a MongoDB:", error);
        throw error; // Re-lanzar el error para que el middleware pueda manejarlo
    }
};

const connected = async (req, res, next) => {
    try {
        await connectToDatabase();
        next();
    } catch (error) {
        res.status(500).send("Error al conectar con la base de datos");
    }
};

export default connected;
