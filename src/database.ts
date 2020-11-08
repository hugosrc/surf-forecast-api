import config, { IConfig } from 'config';
import mongoose, { Mongoose } from 'mongoose';

const dbConfig: IConfig = config.get('App.database');

export const connect = async (): Promise<Mongoose> => {
  console.log("===============")
  console.log(dbConfig.get("mongoUrl"))
  console.log("===============")

  return mongoose.connect(dbConfig.get('mongoUrl'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export const close = async (): Promise<void> => {
  return mongoose.connection.close();
};
