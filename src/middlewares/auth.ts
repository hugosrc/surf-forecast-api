import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@src/services/auth';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      code: 401,
      message: 'token unavailable',
    });
  }

  const bearerToken = authHeader.split(' ');
  if (bearerToken.length != 2) {
    return res.status(401).json({
      code: 401,
      message: 'invalid bearer token',
    });
  }

  try {
    const decoded = AuthService.decodeToken(bearerToken[1]);
    req.decoded = decoded;
  } catch (err) {
    return res.status(401).json({ code: 401, error: err.message });
  }

  return next();
}
