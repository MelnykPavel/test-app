const { createCategories, allCategories } = require("./categoriesControllers");

const { createOrders } = require("./ordersControllers");

module.exports = {
  createCategories,
  allCategories,

  createOrders,
};
