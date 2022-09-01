const dotenv = require('dotenv');
const path = require('path');
const bunyan = require('bunyan');

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const loggers = {
  development: () => bunyan.createLogger({ name: "development", level: "debug" }),
  production: () => bunyan.createLogger({ name: "production", level: "info" }),
  test: () => bunyan.createLogger({ name: "test", level: "fatal" }),
}

const environment = process.env.NODE_ENV || 'development';
const sitenameEnvironment = environment !== 'production' ? ` [${environment}]` : '';
const logger = loggers[environment];

module.exports = {
  [environment]: {
    environment,
    port: process.env.PORT || 5000,
    sitename: `Interview Manager${sitenameEnvironment}`,
    log: logger,
    db_uri: process.env.MONGO_URI,
    secret: process.env.JWT_SECRET || 'kaloseinaikalos',
  }
};