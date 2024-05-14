const controller = {};
const models = require("../models");
const Sequelize = require("sequelize");

controller.showDetails = async (req, res) => {
    let id = req.params.id;
    const Blog = models.Blog;
    let blogs = await Blog.findAll();
    let blog = await blogs[0];
    let filters = await blogs.filter((item) => item.id == id);
    if (filters.length) {
        blog = filters[0];
    }

    const Category = models.Category;
    const Tag = models.Tag;
    const User = models.User;
    const Comment = models.Comment;
    const BlogTag = models.BlogTag;

    const categories = await Blog.findAll({
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

    const comments = await Comment.findAll({
        where: { blogId: id },
    });

    const category = await Category.findOne({
        where: { id: blog.categoryId },
    });

    const allTags = await Tag.findAll();

    //   const tags = await Tag.findAll({
    //     include: [
    //       {
    //         through: BlogTag,
    //         attributes: [],
    //       },
    //     ],
    //   });
    //   console.log(tags);
    const tags = {};

    const author = await User.findOne({
        where: { id: blog.authorId },
    });

    author.isAdmin = author.isAdmin ? "Admin" : "";

    res.render("details", {
        blog,
        allTags,
        tags,
        categories,
        author,
        comments,
        category,
    });
};

module.exports = controller;
