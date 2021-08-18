import { ConnectionOptions } from 'mongoose';

export const {
  MONGO_URI = 'mongodb://localhost:27017/surf-forecast',
} = process.env;

export const MONGO_OPTIONS: ConnectionOptions = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
