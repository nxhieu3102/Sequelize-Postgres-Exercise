const db = require("../models");
const Sequelize = require("sequelize");

const buildGetSummaryBlog = (searchTerm, category, tag) => {
    return `
    SELECT "Blog".*
    FROM (
        SELECT
            "Blog"."title",
            "Blog"."imagePath",
            "Blog"."summary",
            "Blog"."updatedAt",
            COUNT("comments"."id") AS "commentCount",
            "Blog"."id" AS "id"
        FROM "Blogs" AS "Blog"
        LEFT OUTER JOIN "Comments" AS "comments" ON "Blog"."id" = "comments"."blogId"
        LEFT JOIN "BlogTags" AS "bt" ON "Blog"."id" = "bt"."blogId"
        LEFT JOIN "Tags" AS "t" ON "bt"."tagId" = "t"."id"
        LEFT JOIN "Categories" AS "c" ON "Blog"."categoryId" = "c"."id"
        WHERE ("Blog"."title" LIKE '%${searchTerm}%' OR "Blog"."summary" LIKE '%${searchTerm}%')
        ${category ? `AND "c"."name" = '${category}'` : ''}
        ${tag ? `AND "t"."name" = '${tag}'` : ''}
        GROUP BY "Blog"."id"
        ORDER BY "Blog"."title"
        LIMIT $limit OFFSET $offset
    ) AS "Blog";
    `
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
    GetBlogsSummary : async (limit = 6, offset = 0, searchTerm = '', category=null, tag=null) => {
        try {
            const sequelize = db.sequelize;
            const blogs = sequelize.query(buildGetSummaryBlog(searchTerm, category, tag), {
                bind: {limit, offset},
                type: Sequelize.QueryTypes.SELECT
            });
            
            return blogs;
          } catch (error) {
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
};

module.exports = repo;
