const categoryRepo = require("../repository/category");
const blogRepo = require("../repository/blog");
const tagRepo = require("../repository/tag");
const userRepo = require("../repository/user");
const commentRepo = require("../repository/comment");
const controller = {
    showDetail: async (req, res) => {
        try {
            const blog = await blogRepo.GetBlogDetail(req.params.id);
            const author = await userRepo.GetAuthorByBlogId(req.params.id);
            const comment = await commentRepo.GetCommentsByBlogId(req.params.id);
            const tags = tagRepo.GetTagByBlogId(req.params.id);
            res.render("detail", {blog, author, comment, tags});
        }catch (error) {
            console.error('error:', error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = controller;
