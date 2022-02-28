const logger = require('../config/winston');
const respUtil = require('./respUtil');

exports.catchErrorHandle = (error) => {
  if (error instanceof Error) {
    logger.error(error.message);
    logger.error(error.stack);
    return error.message;
  }

  logger.error(error);

  return error;
};

exports.safeErrorHandler = (handler) => (req, res) => handler(req, res).catch((error) => {
  const msg = this.catchErrorHandle(error);
  res.status(500).json(respUtil.makeResponse({
    success: false,
    message: msg,
  }));
});
