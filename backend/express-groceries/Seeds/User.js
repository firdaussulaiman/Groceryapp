const bcrypt = require("bcrypt");

const users = [
  {
    name: "Adam",
    Email: "adam12345@hotmail.com",
    Password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },

  {
    name: "James Smith",
    Email: "james123@hotmail.com",
    Password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

// module.exports= users
export default users;
