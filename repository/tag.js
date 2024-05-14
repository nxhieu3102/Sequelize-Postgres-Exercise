const models = require("../models");

const repo = {
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
