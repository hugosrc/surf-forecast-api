import { AuthService } from '@src/services/auth';
import { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../auth';

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should verify a JWT token and call the next middleware', () => {
    const jwtToken = AuthService.gerenateToken({ data: 'token' });

    mockRequest = {
      headers: {
        authorization: 'Bearer ' + jwtToken,
      },
    };

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalledTimes(1);
  });

  it('should return UNAUTHORIZED if there is problem on the token verification', () => {
    mockRequest = {
      headers: {
        authorization: 'invalid token',
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 401,
      error: 'jwt malformed',
    });
  });

  it('should return UNAUTHORIZED middleware if theres no token', () => {
    mockRequest = {
      headers: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 401,
      message: 'token unavailable',
    });
  });

  it('should return UNAUTHORIZED middleware for malformed bearer token', () => {
    mockRequest = {
      headers: {
        authorization: 'malformed-bearer-token',
      },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    authMiddleware(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      code: 401,
      message: 'invalid bearer token',
    });
  });
});
