const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn.js");
const User = require("./routes/user.js");
const Books = require("./routes/book.js");
//routes
app.use("/api/v1", User);
app.use("/api/v1", Books);

//creating Port
app.listen(process.env.PORT, () => {
  console.log(`Server Started at port ${process.env.PORT}`);
});
