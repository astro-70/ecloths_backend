const Order = require("../Models/Order");

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("userId", "name email").populate("items.productId", "name");
  res.json(orders);
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId }).populate("items.productId", "name images");
  res.json(orders);
};

const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
};

const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};

module.exports = { createOrder, getAllOrders, getUserOrders, updateOrder, deleteOrder };
