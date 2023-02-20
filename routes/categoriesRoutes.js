const express = require("express");
const { allCategories, createCategories } = require("../controllers");

const router = express.Router();

router.route("/").post(createCategories);
router.route("/getCategories").get(allCategories);

module.exports = router;
