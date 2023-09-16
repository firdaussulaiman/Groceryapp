const mongoose = require("mongoose");
const Products = require("../Models/Product");
// require("dotenv").config();

const dbName = "Products";

mongoose.connect(process.env.DATABASE_URL, { dbName: dbName });

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
