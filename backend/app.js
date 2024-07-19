const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn.js");
const User = require("./routes/user.js");
const Books = require("./routes/book.js");
const Favourite = require("./routes/favourite.js");
const Cart = require("./routes/cart.js");

//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);

//creating Port
app.listen(process.env.PORT, () => {
  console.log(`Server Started at port ${process.env.PORT}`);
});
