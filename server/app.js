const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const winston = require('./config/winston');
const respUtil = require('./util/respUtil');
const routes = require('./routes/index');
const { sequelize } = require('./models');

const app = express();

let origin = [];
if (process.env.NODE_ENV === 'development') {
  origin = '*';
}

app.use(cors({
  origin,
}));

app.use(logger('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// interceptor
app.use((req, res, next) => {
  // winston.info(`Request Headers: ${JSON.stringify(req.headers)}`);
  // winston.info(`method: ${req.method}`);
  if (req.method === 'GET' || (req.headers['content-type'] && req.headers['content-type'].includes('application/json'))) {
    winston.info(`Request Body: ${JSON.stringify(req.body)}`);
    next();
  } else {
    winston.error('[415] Unsupported Media Type');
    res.status(415);
    res.json(respUtil.makeResponse({ success: false, message: '[415] Unsupported Media Type' }));
  }
});

// route 적용
routes.apply(app);

app.use((req, res) => {
  res.status(404);
  res.json(respUtil.makeResponse({ success: false, message: '[404] Not Found' }));
});

// error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  const status = err.status || 500;
  res.status(status)
    .json(respUtil.makeResponse({ success: false, message: `[${status}] Something goes wrong` }));
});

// sequelize sync
sequelize.sync({ force: false }).then(() => {
  console.log('데이터베이스 연결 성공');
}).catch((err) => {
  console.error(err);
});

module.exports = app;
