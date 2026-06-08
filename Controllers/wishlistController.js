const Wishlist = require("../Models/Wishlist");

const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate("products");
  res.json(wishlist || { products: [] });
};

const updateWishlist = async (req, res) => {
  const { userId, products } = req.body;
  const wishlist = await Wishlist.findOneAndUpdate({ userId }, { products }, { new: true, upsert: true });
  res.json(wishlist);
};

module.exports = { getWishlist, updateWishlist };
