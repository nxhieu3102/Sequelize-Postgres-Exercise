'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Comment, {
        foreignKey: 'blogId',
        as: 'comments'
      });
    }
  }
  Blog.init({
    title: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
