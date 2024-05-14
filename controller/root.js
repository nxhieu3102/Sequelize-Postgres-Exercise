"use strict";

const controller = {};
const Sequelize = require("sequelize");
const models = require("../models");

controller.showData = async (req, res) => {
    const Category = models.Category;
    const Tag = models.Tag;
    const Blog = models.Blog;
    const Comment = models.Comment;

    const tagsPromise = Tag.findAll();
    const categoryPromise = Blog.findAll({
        attributes: [
            [Sequelize.col("Category.name"), "categoryName"],
            [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
        ],
        include: [
            {
                model: Category,
                attributes: [],
            },
        ],
        group: ["Category.name"],
        raw: true,
    });

    const blogsWithComments = Blog.findAll({
        attributes: [
            "id",
            "title",
            "createdAt",
            "summary",
            "imagePath",
            [Sequelize.fn("COUNT", Sequelize.col("*")), "commentCount"],
        ],
        include: [
            {
                model: Comment,
                attributes: [],
            },
        ],
        group: ["Blog.id"],
        raw: true,
    });

    try {
        const [categories, tags, blogs] = await Promise.all([
            categoryPromise,
            tagsPromise,
            blogsWithComments,
        ]);

        res.render("index", { categories, tags, blogs });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = controller;
