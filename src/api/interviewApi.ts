import { Router } from 'express';
import {
  saveInterview,
  deleteInterview,
  getInterview,
  getInterviews
} from '../controllers/interviewController';
import protect from '../middleware/authMiddleware';

const interviewRouter = Router();

interviewRouter.post('/save', protect, saveInterview);

interviewRouter.post('/delete', protect, deleteInterview);

interviewRouter.get('/:id', protect, getInterview);

interviewRouter.post('/list', protect, getInterviews);

export default interviewRouter;