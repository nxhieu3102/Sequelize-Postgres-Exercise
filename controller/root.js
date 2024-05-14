const categoryRepo = require("../repository/category");
const blogRepo = require("../repository/blog");
const tagRepo = require("../repository/tag");

const controller = {
    showHome: async (req, res) => {
        try {
            const tags = await tagRepo.GetAllTags();
            const categories = await categoryRepo.GetTotalPerCategory();

            res.render("index", { categories, tags, blogs });
        }catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = controller;
