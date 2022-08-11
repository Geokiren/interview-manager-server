import express, { Application, json, urlencoded } from 'express';
import 'dotenv/config';
import connectDB from './db/db';
import userRouter from './api/userApi';
import interviewRouter from './api/interviewApi';
import compression from 'compression';
import { port, log, environment } from './currentConfig';
import clustersInit from './clustersInit';
import helmet from 'helmet';

const server: Application = express();

//* Init tools
server.use(json());
server.use(urlencoded({ extended: true }));
server.use(helmet());
server.use(compression());

//* API
server.use('/api/users', userRouter);
server.use('/api/interviews', interviewRouter);

//* Init server
if (environment === 'production') {
  clustersInit(server);
} else {
  connectDB().then(() => {
    server.listen(port, () => log.info(`Listening on http://localhost:${port}`));
  }).catch((error) => {
    log.fatal(error);
  });
}
