const router = require("express").Router();
const { getWishlist, updateWishlist } = require("../Controllers/wishlistController");

router.get("/:userId", getWishlist);
router.post("/", updateWishlist);

module.exports = router;
