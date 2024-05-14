const categoryRepo = require("../repository/category");
const blogRepo = require("../repository/blog");
const tagRepo = require("../repository/tag");

const controller = {
    showDetail: async (req, res) => {
        try {
            const blogDetail = await blogRepo.GetBlogDetail(req.params.id);
            console.log('blogDetail', blogDetail);
            res.render("index", { categories, tags, blogs });
        }catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = controller;
