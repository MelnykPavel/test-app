const { Categories } = require("../models");

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
  try {
    const buildTree = async (node) => {
      const children = await Categories.find({ parent: node.value }).exec();
      const childNodes = await Promise.all(children.map(buildTree));
      return {
        title: node.title,
        value: node._id,
        key: node._id,
        children: childNodes.length > 0 ? childNodes : null,
      };
    };

    const rootNodes = await Categories.find({ parent: 0 }).exec();
    const rootNodeObjects = await Promise.all(rootNodes.map(buildTree));

    return res.status(200).json({
      success: true,
      treeData: rootNodeObjects,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createCategories,
  allCategories,
};
