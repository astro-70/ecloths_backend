const Coupon = require("../Models/Coupon");

const getAll = async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
};

const create = async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
};

const remove = async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ message: "Coupon deleted" });
};

const validate = async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });
  if (!coupon) return res.status(404).json({ message: "Invalid coupon" });
  res.json({ discount: coupon.discount });
};

module.exports = { getAll, create, remove, validate };
