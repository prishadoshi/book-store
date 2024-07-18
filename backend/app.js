const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
require("./conn/conn.js");
const user = require("./routes/user.js");

//routes
app.use("/api/v1", user);

//creating Port
app.listen(process.env.PORT, () => {
  console.log(`Server Started at port ${process.env.PORT}`);
});
