const Product = require("../Models/Product");

const getAll = async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category } : {};
  const products = await Product.find(filter);
  res.json(products);
};

const getById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

const create = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

const update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};

const remove = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
};

module.exports = { getAll, getById, create, update, remove };
