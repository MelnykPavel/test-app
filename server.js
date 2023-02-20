const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const { connectToMongoDB } = require("./config/connectToMongoDB");

const { categoriesRoutes, ordersRoutes } = require("./routes/");

const app = express();
app.use(express.json());

dotenv.config({ path: path.join(__dirname, "./.env") });
connectToMongoDB();

app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
