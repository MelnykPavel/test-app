const express = require("express");
const { createOrders } = require("../controllers");

const router = express.Router();

router.route("/").post(createOrders);

module.exports = router;
