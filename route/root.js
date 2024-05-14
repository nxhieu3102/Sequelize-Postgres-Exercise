const express = require("express");
const router = express.Router();
const controller = require("../controller/root");

router.get("/", controller.showData);

module.exports = router;
