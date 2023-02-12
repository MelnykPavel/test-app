const express = require("express");
const {
  allCategories,
  createCategories,
} = require("../controllers/categoriesControllers");

const categoriesRoutes = express.Router();

categoriesRoutes.route("/").post(createCategories);
categoriesRoutes.route("/getCategories").get(allCategories);

module.exports = {
  categoriesRoutes,
};
