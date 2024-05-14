const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const buildGetBlogDetailQuery = () => {
    return `
        with BlogTags as (select "blogId", array_agg("Tags".name) as "tags"
                          from "BlogTags"
                                   join "Tags"
                                        on "Tags".id = "BlogTags"."tagId"
                          group by "blogId"
                          order by "blogId")
        select title, "Blogs"."imagePath" as imagePath, "Blogs".description as description, "Blogs".'createdAt' as createdAt, "Users"."firstName" as authorFirstName, "Users"."lastName" as authorLastName, "Users"."imagePath" as authorImage, tags
        from "Blogs"
        join "Categories" on "Blogs"."categoryId" = "Categories".id
        join "Users" on "Users".id = "Blogs"."authorId"
        join BlogTags on BlogTags."blogId" = "Blogs".id
        where "Blogs".id = $blogId;
    `;
}

const repo = {
    GetBlogById: async(id) => {
        try{
            const blog = await db['Blog'].findOne({
                where: {
                    id
                },
            });
            return blog;

        }catch (error) {
            console.log('Error in GetBlogById', error);
            throw error;
        }
    },
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
        const sequelize = db.sequelize;
        try {
            const blogDetail = await db['Blog'].findOne({
                where: {
                    id
                },
                raw: true,
            });

            return blogDetail;
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
                raw: true,
            });
        } catch (error) {
            console.log('Error in GetBlogByTitle', error);
            throw error;
        }
    }
};

module.exports = repo;
