const router = require("express").Router();
const { getAll, create, remove, validate } = require("../Controllers/couponController");
const { adminAuth } = require("../Utils/authMiddleware");

router.get("/", getAll);
router.post("/", adminAuth, create);
router.delete("/:id", adminAuth, remove);
router.get("/validate/:code", validate);

module.exports = router;
