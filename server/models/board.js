const {
  Model,
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  class board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    static associate() {
      // define association here
    }
  }
  board.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'board',
    hooks: {
      beforeCreate: (model) => {
        model.createdAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
        model.updatedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
      },
      beforeUpdate: (model) => {
        model.updatedAt = moment().utc().format('YYYY-MM-DD HH:mm:ss');
      },
    },
  });
  return board;
};
