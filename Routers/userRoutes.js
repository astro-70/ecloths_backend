const router = require("express").Router();
const { signup, login, sendOtp, verifyOtp, changePassword, getAllUsers, getUserById, updateUser, deleteUser } = require("../Controllers/userController");
const { auth, adminAuth } = require("../Utils/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/change-password", changePassword);
router.get("/", adminAuth, getAllUsers);
router.get("/:id", auth, getUserById);
router.put("/:id", auth, updateUser);
router.delete("/:id", adminAuth, deleteUser);

module.exports = router;
