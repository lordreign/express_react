const moment = require('moment');

module.exports = {
  async up(queryInterface) {
    const boards = [];
    for (let i = 0; i < 15; i += 1) {
      boards.push({
        title: `${i}번째 제목`,
        content: `${i}번째 내용`,
        createdAt: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    await queryInterface.bulkInsert('boards', boards, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('boards', null, {});
  },
};
