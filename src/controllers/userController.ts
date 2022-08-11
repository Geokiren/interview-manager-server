import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //* Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const registerUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const { firstName, middleName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the user info!');
  }

  //* Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //* Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //* Create User
  const user = await User.create({ firstName, middleName, lastName, email, password: hashedPassword });
  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id)
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const getUser = expressAsyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user.id);
  if (user !== null) {
    res.status(200).json({ id: user._id, firstName: user.firstName, middleName: user.middleName, lastName: user.lastName, email: user.email });
  } else {
    res.status(400);
    throw new Error('Can not find user');
  }
});

//* Generate JWT
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}

export { loginUser, registerUser, getUser };