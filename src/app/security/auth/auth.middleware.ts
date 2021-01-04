import { Request, Response, NextFunction } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.isUnauthenticated()) {
    return res.sendStatus(401);
  }
  return next();
};

export default authMiddleware;
