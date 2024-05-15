const Sequelize = require("sequelize");
const db = require("../models");

const buildQuery = () => {
    return `
        select "Blogs".id, "Categories".name
        from "Categories" join "Blogs"
        on "Blogs"."categoryId" = "Categories".id
        where "Blogs".id = $blogId;
    `
}

const buildQueryGetTotalPerCategory = () => {
    return`
        select "Categories".name as name, count(*) as count
        from "Categories" join "Blogs"
        on "categoryId" = "Categories".id
        group by "Categories".name
    `
}

const repo = {
    GetCategoriesByBlogId: async (blogId) => {
        try {
            const sequelize = db.sequelize;
            const Categories = await sequelize.query(buildQuery(), {
                bind: { blogId },
                type: Sequelize.QueryTypes.SELECT
            });
            if (Categories && Categories.length > 0) {
                return Categories;
            } else {
                return [];
            }
        } catch (error) {
            console.log('Error in GetCategoriesByBlogId', error);
            throw error
        }
    },
    GetTotalPerCategory : async () => {
        try {
            const sequelize = db.sequelize;
            const categories = await sequelize.query(buildQueryGetTotalPerCategory(), {
                type: Sequelize.QueryTypes.SELECT
            });
            return categories;
        }catch (error) {
            console.log('Error in GetTotalPerCategory', error);
            throw error;
        }
    },
};

module.exports = repo;
