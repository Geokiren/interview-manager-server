import config from 'config';
import 'dotenv/config';

interface configz {
  port: number,
  log: Function,
  environment: string,
  secret: string
}

const environment = process.env.NODE_ENV || 'development';
const currentConfig: configz = config.get(environment);

const port: number = currentConfig.port;
const log = currentConfig.log();
const secret: string = currentConfig.secret;

export { port, log, environment, secret };