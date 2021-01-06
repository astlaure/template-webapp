import { Request, Response, NextFunction } from 'express';
import csrfMiddleware from '../../../../src/app/security/csrf/csrf.middleware';

describe('CSRF Middleware', () => {
  const mockRequest: Partial<Request> = {};
  const mockResponse: Partial<Response> = {};
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest.csrfToken = () => { return '1234567890'; };
    mockResponse.cookie = jest.fn();
  });

  test('when the request doesn\'t have the XSRF cookie', () => {
    mockRequest.cookies = {};
    csrfMiddleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.cookie).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  test('when the request has the XSRF cookie', () => {
    mockRequest.cookies = { 'XSRF-TOKEN': '1234567890' };
    csrfMiddleware(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockResponse.cookie).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
  });
});
