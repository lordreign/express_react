const users = require('./users');
const boards = require('./boards');

exports.apply = (app) => {
  // 라우트 일괄 적용
  app.use('/api/v1/users', users);
  app.use('/api/v1/boards', boards);
};
