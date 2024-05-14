'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // comment belongs to a blog
      this.belongsTo(models.Blog, {
        foreignKey: 'blogId',
        as: 'blog'
      });
    }
  }
  Comment.init({
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    blogId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
