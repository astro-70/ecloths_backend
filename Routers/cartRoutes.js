const router = require("express").Router();
const { getCart, updateCart, clearCart } = require("../Controllers/cartController");

router.get("/:userId", getCart);
router.post("/", updateCart);
router.delete("/:userId", clearCart);

module.exports = router;
