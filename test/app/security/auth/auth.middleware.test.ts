import { Request, Response, NextFunction } from 'express';
import authMiddleware from '../../../../src/app/security/auth/auth.middleware';

describe('Auth Middleware', () => {
  const mockRequest: Partial<Request> = {};
  const mockResponse: Partial<Response> = {};
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    mockResponse.json = jest.fn();
    mockResponse.sendStatus = jest.fn();
  });

  test('when the request is unauthorized return 401', () => {
    mockRequest.isUnauthenticated = () => { return true; };
    authMiddleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(401);
  });

  test('when the request is authorized return next', () => {
    mockRequest.isUnauthenticated = () => { return false; };
    authMiddleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.sendStatus).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});
