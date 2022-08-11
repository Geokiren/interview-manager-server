require('dotenv').config();
const bunyan = require('bunyan');

const loggers = {
  development: () => bunyan.createLogger({ name: "development", level: "debug" }),
  production: () => bunyan.createLogger({ name: "production", level: "info" }),
  test: () => bunyan.createLogger({ name: "test", level: "fatal" }),
}

module.exports = {
  development: {
    port: process.env.PORT,
    sitename: 'Interview Manager [Development]',
    log: loggers.development,
    db_uri: process.env.MONGO_URI,
    secret: process.env.JWT_SECRET,
  },
  production: {
    port: process.env.PORT,
    sitename: 'Interview Manager',
    log: loggers.production,
    db_uri: process.env.MONGO_URI,
    secret: process.env.JWT_SECRET,
  },
  test: {
    port: process.env.PORT,
    sitename: 'Interview Manager [Test]',
    log: loggers.test,
    db_uri: process.env.MONGO_URI,
    secret: process.env.JWT_SECRET,
  },
};