const mongoose = require("mongoose");

const CategoriesSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    value: { type: Number, required: true, unique: true },
    ancestors: { type: [String], required: true },
    parent: { type: Number, required: true },
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", CategoriesSchema);
module.exports = Categories;
