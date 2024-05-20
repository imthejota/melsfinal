import { connect } from "mongoose";

const dbUrl = `mongodb://localhost:27017/mels`;
let config = {};
config.useNewUrlParser = true;
config.useUnifiedTopology = true;
const connect = async (req, res, next) => {
  try {
    await connect(dbUrl, config);
    next();
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
  }
};

export default connect;
