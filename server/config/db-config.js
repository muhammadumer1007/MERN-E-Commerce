import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(connectionString);

    console.log(connection.connection.host, connection.connection.name);
  } catch (err) {
    console.log(err);
    
    process.exit(1);
  }
};

export default connectToDb;
