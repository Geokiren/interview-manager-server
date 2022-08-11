import { Router } from 'express';
import { saveInterview, deleteInterview, getInterview } from '../controllers/interviewController';
import protect from '../middleware/authMiddleware';

const interviewRouter = Router();

interviewRouter.post('/save', protect, saveInterview);

interviewRouter.post('/delete', protect, deleteInterview);

interviewRouter.get('/:id', protect, getInterview);

export default interviewRouter;