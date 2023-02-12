const Categories = require("../models/Categories");

const createCategories = async (req, res) => {
  try {
    for (item of req.body.data) {
      const { value } = item;

      const isExist = await Categories.findOne({ value });
      if (!isExist) {
        await Categories.create(item);
      }
    }
    return res.status(200).json({
      success: true,
      message: "success",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "false",
    });
  }
};

const allCategories = async (req, res) => {
  const getAll = await Categories.find();
  console.log(`get All`, getAll);
  return res.status(200).json(getAll);
};
module.exports = {
  createCategories,
  allCategories,
};
