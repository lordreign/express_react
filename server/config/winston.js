const path = require('path');
const winston = require('winston');
const moment = require('moment');
const fsUtil = require('../util/fsUtil');

require('winston-daily-rotate-file');

const logDirectory = path.join(__dirname, '../logs');
fsUtil.mkdir(path.join(__dirname, '../logs')); // make log directory

const options = {
  infoFile: {
    level: 'info',
    filename: path.resolve(logDirectory, 'app_info-%DATE%.log'),
    handleExceptions: true,
    format: winston.format.printf(
      (info) => `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`,
    ),
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: '14d',
    colorize: false,
  },
  errorFile: {
    level: 'error',
    filename: path.resolve(logDirectory, 'app_error-%DATE%.log'),
    handleExceptions: true,
    format: winston.format.printf(
      (info) => `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')} [${info.level.toUpperCase()}] - ${info.message}`,
    ),
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: '30d',
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    format: winston.format.simple(),
    colorize: true,
  },
};

const logger = winston.createLogger({
  // 파일저장
  transports: [
    new winston.transports.DailyRotateFile(options.infoFile),
    new winston.transports.DailyRotateFile(options.errorFile),
    new winston.transports.Console(options.console),
  ],
});

logger.stream = {
  // eslint-disable-next-line
  write: (message, encoding) => {
    logger.info(message);
  },
};

// eslint-disable-next-line
logger.combinedFormat = (err, req, res) => {
  // Similar combined format in morgan
  // eslint-disable-next-line
  `${req.ip} - - [${moment(new Date())}] 
  "${req.method} ${req.originalUrl} HTTP/${req.httpVersion}" ${err.status
    || 500} - ${req.headers['user-agent']}`;
};

module.exports = logger;
