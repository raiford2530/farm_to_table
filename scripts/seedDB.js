// const mongoose = require("mongoose");
// const db = require("../models/User");

// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/farm-to-table"
// );

// const userSeed = [
//   {
//     username: "user1",
//     name: "Neil Gandhi",
//     address: "123 Test Drive, New york, NY, 12345",
//     password: "password123",
//     email: "test@farm.com",
//   },
//   {
//     username: "user2",
//     name: "Robert Anderson",
//     address: "321 DataBase Rd, Atlanta, GA 98765",
//     password: "password758",
//     email: "rob@mongoose.com",
//   },
// ];

// const productsSeed = [
//   {
//     name: "Apples",
//     unitSize: "pounds",
//     price: 2.99,
//     quantity: 10,
//     category: "fruit",
//   },
//   {
//     name: "Lettuce",
//     unitSize: "each",
//     price: 3.49,
//     quantity: 10,
//     category: "veggie",
//   },
//   {
//     name: "Chicken",
//     unitSize: "pounds",
//     price: 4.99,
//     quantity: 10,
//     category: "poultry",
//   },
// ];

// db.User.remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then((data) => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });