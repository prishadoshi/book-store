const router = require("express").Router();
const { authenticateToken } = require("./userAuth.js");
const User = require("../models/user.js");
const Order = require("../models/order.js");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      //saving order in urder model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "Success",
      mesage: "Order placed successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured." });
  }
});

//get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured." });
  }
});

//get all orders --admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({ path: "book" })
      .populate({ path: "user" })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mesage: "An error occurred" });
  }
});

//update order status(placed, delivered, cancelled, etc) --admin
router.get("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      data: "Status updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mesage: "An error occurred" });
  }
});

module.exports = router;
