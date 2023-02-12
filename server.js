const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const { connectToMongoDB } = require("./config/connectToMongoDB");

const { categoriesRoutes } = require("./routes/categoriesRoutes");

const app = express(); // Use express js in our app
app.use(express.json()); // Accept JSON data

dotenv.config({ path: path.join(__dirname, "./.env") }); // Specify a custom path if your file containing environment variables is located elsewhere
connectToMongoDB(); // Connect to Database

app.use("/api/categories", categoriesRoutes);
// app.use("/api/order", orderRoutes);

// --------------------------DEPLOYMENT------------------------------

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "./client/build")));

//   app.get("*", (req, res) => {
//     return res.sendFile(
//       path.resolve(__dirname, "client", "build", "index.html")
//     );
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running");
//   });
// }

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);
