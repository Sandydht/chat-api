import mongoose from 'mongoose';

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDBName = process.env.MONGO_DB_NAME;
const mongooseURL: string = `mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongooseURL);
    console.log(`MongoDB connected: ${new Date()}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

export default connectDB;