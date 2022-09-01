
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import { log, secret } from '../currentConfig';

interface JwtPayload {
  id: string
}

interface userInterface {
  id: string,
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  password: string
}

const protect = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //* Get token from header
      token = req.headers.authorization.split(' ')[1];

      //* Verify token
      const { id } = jwt.verify(token, secret) as JwtPayload;

      //* Get user from token
      req.user = await User.findById(id).select('-password') as userInterface;

      next();
    } catch (error) {
      log.fatal(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export default protect;