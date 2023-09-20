const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var bcrypt = require("bcrypt");

require("dotenv/config");
app.use(bodyParser());
//PANGGIL ROUTES
const userRoutes = require("./routes/userRoutes");
const barangRoutes = require("./routes/barangRoutes");
app.use("/users", userRoutes);
app.use("/barang", barangRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const mongoURL = process.env.MONGO_URI || process.env.DB_CONNECTION;
mongoose.connect(mongoURL);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected");
});
