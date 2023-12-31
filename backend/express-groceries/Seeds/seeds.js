const mongoose = require("mongoose");
const Products = require("../Models/Product");
const seedProducts = require("./grocery.json");
require("dotenv").config();

const dbName = "Grocery";

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName,
});

// shortcut to mongoose.connection object
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

//seeds the data

const seedDB = async () => {
  await Products.deleteMany();
  await Products.insertMany(seedProducts);
  console.log("Data seeded!");
};

const closedConnection = async () => {
  await mongoose.connection.close();
  console.log("Connection closed!");
};

seedDB().then(() => closedConnection);
