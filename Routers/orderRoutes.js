const router = require("express").Router();
const { createOrder, getAllOrders, getUserOrders, updateOrder, deleteOrder } = require("../Controllers/orderController");
const { auth, adminAuth } = require("../Utils/authMiddleware");

router.post("/", auth, createOrder);
router.get("/", adminAuth, getAllOrders);
router.get("/user/:userId", auth, getUserOrders);
router.put("/:id", adminAuth, updateOrder);
router.delete("/:id", adminAuth, deleteOrder);

module.exports = router;
