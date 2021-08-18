import mongoose, { Mongoose } from 'mongoose';
import { MONGO_OPTIONS, MONGO_URI } from './config';

export const connect = async (): Promise<Mongoose> => {
  return mongoose.connect(MONGO_URI, MONGO_OPTIONS);
};

export const close = async (): Promise<void> => {
  return mongoose.connection.close();
};
