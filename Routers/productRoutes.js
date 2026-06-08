const router = require("express").Router();
const { getAll, getById, create, update, remove } = require("../Controllers/productController");
const { adminAuth } = require("../Utils/authMiddleware");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", adminAuth, create);
router.put("/:id", adminAuth, update);
router.delete("/:id", adminAuth, remove);

module.exports = router;
