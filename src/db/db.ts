import mongoose from "mongoose";
import { log } from '../currentConfig';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    log.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    log.fatal(error);
    process.exit(1);
  }
}

export default connectDB;