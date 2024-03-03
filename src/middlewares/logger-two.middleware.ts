import { NextFunction, Request, Response } from 'express';

export function LoggerTwoMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // console.log('req2');

  next();
}
