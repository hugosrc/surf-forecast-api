import { Schema, Document, Model, model } from 'mongoose';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

interface UserModel extends Omit<User, '_id'>, Document {}

const schema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: [true, 'Email must be unique'],
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const User: Model<UserModel> = model('User', schema);
