const Cart = require("../Models/Cart");

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
  res.json(cart || { items: [] });
};

const updateCart = async (req, res) => {
  const { userId, items } = req.body;
  const cart = await Cart.findOneAndUpdate({ userId }, { items }, { new: true, upsert: true });
  res.json(cart);
};

const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ userId: req.params.userId });
  res.json({ message: "Cart cleared" });
};

module.exports = { getCart, updateCart, clearCart };
