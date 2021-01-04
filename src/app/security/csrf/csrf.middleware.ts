import { Request, Response, NextFunction } from 'express';

const csrfMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { 'XSRF-TOKEN': xsrfToken } = req.cookies;

  if (!xsrfToken) {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false, path: '/' });
  }

  return next();
};

export default csrfMiddleware;
