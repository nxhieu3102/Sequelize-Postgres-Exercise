const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const repo = {
    GetBlogsSummary : async (limit = 6, offset = 0) => {
        try {
            return models.Blog.findAll({
                attributes: [
                    'title',
                    'imagePath',
                    'summary',
                    'updatedAt',
                    [Sequelize.fn('COUNT', Sequelize.col('Comments.id')), 'totalComment']
                ],
                include: [
                    {
                        model: models.Comment,
                        required: true
                    },
                ],
                group: ['Blog.id'],
                limit,
                offset,
                raw: true,
            });
        }catch (error) {
            console.log('Error in GetTotalPerCategory', error);
            throw error;
        }
    },
    GetBlogDetail: async (id) => {
        try {
            return models.Blog.findOne({
                where: { id },
                raw: true,
                include: [
                    {
                        model: models.Category,
                        attributes: ['name'],
                    },
                    {
                        model: models.User,
                        attributes: ['name'],
                    },
                    {
                        model: models.Comment,
                        attributes: ['content'],
                        include: [
                            {
                                model: models.User,
                                attributes: ['name'],
                            }
                        ]
                    },
                    {
                        model: models.BlogTag,
                        attributes: [],
                    }

                ]
            });
        } catch (error) {
            console.log('Error in GetBlogDetail', error);
            throw error;
        }
    },
    GetBlogByTitle: async (title) => {
        try {
            return models.Blog.findAll({
                where: {
                    title: {
                        [Op.like]: `%${title}%`
                    }
                },
                raw: true,
            });
        } catch (error) {
            console.log('Error in GetBlogByTitle', error);
            throw error;
        }
    }
};

module.exports = repo;
