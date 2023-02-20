const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user: { type: String, required: true, trim: true },
    orderedCategories: {
      type: [
        {
          category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
          },
          title: { type: String },
          value: { type: Number },
        },
      ],
      required: true,
      id: false,
    },
    isAgree: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
