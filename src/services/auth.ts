import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@src/models/user';
import { JWT_TOKEN_EXPIRES_IN, JWT_TOKEN_SECRET } from '@src/config';

export interface DecodedUser extends Omit<User, '_id'> {
  id: string;
}

export class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static gerenateToken(payload: object): string {
    return jwt.sign(payload, JWT_TOKEN_SECRET, {
      expiresIn: JWT_TOKEN_EXPIRES_IN,
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, JWT_TOKEN_SECRET) as DecodedUser;
  }
}
