import { Router } from 'express';
import { loginUser, registerUser, getUser } from '../controllers/userController';
import protect from '../middleware/authMiddleware';

const userRouter = Router();

userRouter.post('/login', loginUser);

userRouter.post('/register', registerUser);

userRouter.get('/me', protect, getUser);

export default userRouter;