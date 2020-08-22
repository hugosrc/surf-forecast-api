import mongoose, { Schema, Document, Model, model } from 'mongoose';
import { AuthService } from '@src/services/auth'

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED'
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

schema.path('email').validate(async (email: string) => {
  const emailCount = await mongoose.models.User.countDocuments({ email })

  return !emailCount
}, 'already exists in the database.', CUSTOM_VALIDATION.DUPLICATED)

schema.pre<UserModel>('save', async function(): Promise<void> {
  if (!this.password || !this.isModified('password')) {
    return;
  }

  try {
    const hashedPassword = await AuthService.hashPassword(this.password)
    this.password = hashedPassword
  } catch (error) {
    console.error(`Error hashing the password for the user ${this.name}`)
  }
})

export const User: Model<UserModel> = model('User', schema);
