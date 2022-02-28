const base = require('./base');
const models = require('../models');
const logger = require('../config/winston');

// db에 연결된것
const sequelize = models.sequelize;
const Op = models.Sequelize.Op;

exports.getItemList = async ({ title, page = 1, pageSize = 20, sort = 'id', sortDesc = false }) => {
  const query = {
    order: [[sort, sortDesc ? 'DESC' : 'ASC']],
  };
  if (title) {
    query.where = {
      title: {
        [Op.substring]: title,
      },
    };
  }

  return await models.board.findAll(base.paginate(query, { page, pageSize }));
};

exports.getItem = async ({ id }) => await models.board.findOne({ where: { id } });

exports.create = async ({ title, content }) => {
  if (!title || !content) return { success: false, message: '필수 항목 존재 안함' };
  try {
    // transaction 처리 예제
    const result = await sequelize.transaction(async (t) => {
      const board = await models.board.create({ title, content }, { transaction: t });
      return board;
    });
    return { success: true, data: { board: { id: result.id } } };
  } catch (e) {
    logger.error(`서버 에러: ${e}`);
    return null;
  }
};

exports.update = async ({ id, title, content }) => {
  if (!id || !title || !content) return { success: false, message: '필수 항목 존재 안함' };
  try {
    // transaction 처리 예제
    await sequelize.transaction(async (t) => {
      await models.board.update({ title, content }, {
        where: { id },
        transaction: t,
      });
    });
    return { success: true, data: { board: { id } } };
  } catch (e) {
    logger.error(`서버 에러: ${e}`);
    return null;
  }
};

exports.delete = async ({ id }) => {
  if (!id) return { success: false, message: '필수 항목 존재 안함' };
  const result = await models.board.destroy({
    where: { id },
  });
  logger.info(result);
  return { success: true, message: '삭제 완료' };
};
