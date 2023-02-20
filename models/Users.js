const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
