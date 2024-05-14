const Sequelize = require("sequelize");
const models = require("../models");

const repo = {
    GetTotalPerCategory : async () => {
        try {
            return models.Category.findAll({
                attributes: [
                    'name',
                    [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
                ],
                group: ["name"],
                raw: true,
            });
        }catch (error) {
            console.log('Error in GetTotalPerCategory', error);
            throw error;
        }
    },
};

module.exports = repo;
