'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Comments', {
      fields: ['blogId'],
      type: 'foreign key',
      name: 'fk_blog_comment',
      references: {
        table: 'Blogs',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Comments', 'fk_blog_comment');
  }
};
