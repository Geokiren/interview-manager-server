import { Application } from 'express';
import cluster from 'cluster';
import os from 'os';
import { port, log } from './currentConfig';
import connectDB from './db/db';

const numberOfCPUs = os.cpus().length;

const clustersInit = (server: Application) => {
  if (cluster.isPrimary) {
    log.info(`Primary ${process.pid} is running`);
    for (let i = 0; i < numberOfCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      log.fatal(`Worker ${worker.process.pid} just died`);
      cluster.fork();
    });
  } else {
    connectDB().then(() => {
      server.listen(port, () => log.info(`Listening on http://localhost:${port}`));
    }).catch((error) => {
      log.fatal(error);
    });
  }
}

export default clustersInit;