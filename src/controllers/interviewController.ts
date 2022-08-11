import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel';
import Interview from '../models/interviewModel';

const saveInterview = expressAsyncHandler(async (req: Request, res: Response) => {
  const {
    userId, company, region, applicationUrl, apointments,
    stackInfo, improveSelf, notes, status, isActive
  } = req.body;

  //* Check if user exists
  const user = await User.findById(userId);
  if (user !== null) {

    //* Create interview
    const interview = await Interview.create({
      userId, company, region, applicationUrl, apointments,
      stackInfo, improveSelf, notes, status, isActive,
    });
    if (interview) {
      res.json({
        _id: interview.id,
        company: interview.company,
        region: interview.region,
        applicationUrl: interview.applicationUrl,
        apointments: interview.apointments,
        stackInfo: interview.stackInfo,
        improveSelf: interview.improveSelf,
        notes: interview.notes,
        status: interview.status,
        isActive: interview.isActive,
      });
    }
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const deleteInterview = expressAsyncHandler(async (req: Request, res: Response) => {
  const { userId, id } = req.body;

  //* Check if user exists
  const user = await User.findById(userId);
  if (user !== null) {

    //* Create interview
    const deletedInterview = await Interview.deleteOne({ _id: id });
    if (deletedInterview) {
      res.json({ ...deletedInterview });
    }
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

const getInterview = expressAsyncHandler(async (req: Request, res: Response) => {
  const interview = await Interview.findById(req.interview.id);
  if (interview !== null) {
    res.status(200).json({ ...interview });
  } else {
    res.status(400);
    throw new Error('Can not find interview');
  }
});

export { saveInterview, deleteInterview, getInterview };