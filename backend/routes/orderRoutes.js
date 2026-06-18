const express = require("express");

const Order = require("../models/Order");

const router = express.Router();


// CREATE ORDER
router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL ORDERS
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET SINGLE ORDER
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId")
      .populate("products.productId");

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;