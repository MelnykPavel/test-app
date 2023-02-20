const { Order, User } = require("../models");

const createOrders = async (req, res) => {
  const { userName, orderedCategories, isAgree, updateOrder } = req.body;

  try {
    let createOrder;
    let createUser;

    if (updateOrder) {
      createOrder = await Order.findById(updateOrder);

      if (!createOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      await User.findByIdAndUpdate(createOrder.user, { $set: { userName } });
      createOrder.orderedCategories = orderedCategories.map((id) => {
        return { category: id };
      });
      createOrder.isAgree = isAgree;
    } else {
      createUser = await User.findOne({ userName });

      if (!createUser) {
        createUser = await User.create({ userName });
      }

      createOrder = await Order.create({
        user: createUser._id,
        orderedCategories: orderedCategories.map((id) => {
          return { category: id };
        }),
        isAgree,
      });
    }

    await createOrder.save();

    const order = await Order.findById(createOrder._id)
      .populate("orderedCategories.category", "title value")
      .exec();

    return res.status(200).json({
      success: true,
      message: "success",
      order: order,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "false",
    });
  }
};

module.exports = {
  createOrders,
};
