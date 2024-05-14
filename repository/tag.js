const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const buildQuery = () => {
    return `
        select array_agg("Tags".name) as "tags"
        from "BlogTags"
               join "Tags"
                    on "Tags".id = "BlogTags"."tagId"
        where "blogId" = $blogId
        group by "blogId"
    `
}
const repo = {
    GetTagByBlogId: async (id) => {
        try {
            const sequelize = db.sequelize;
            const blogTags = await sequelize.query(buildQuery(), {
                bind: { blogId: id },
                type: Sequelize.QueryTypes.SELECT
            });
            console.log('blogTags', blogTags);
            return blogTags;
        }catch (error) {
            console.log('Error in GetTagByBlogId', error);
            throw error;
        }
    },
    GetAllTags : async () => {
        try {
            return models.Tag.findAll({
                attributes: [
                    'name',
                ],
                distinct: true,
                raw: true,
            });
        } catch (error) {
            console.log('Error in GetAllTags', error);
            throw error;
        }
    }
};

module.exports = repo;
