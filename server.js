require("dotenv").config();
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./Routers/userRoutes");
const productRoutes = require("./Routers/productRoutes");
const cartRoutes = require("./Routers/cartRoutes");
const wishlistRoutes = require("./Routers/wishlistRoutes");
const orderRoutes = require("./Routers/orderRoutes");
const couponRoutes = require("./Routers/couponRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "https://hilarious-nasturtium-18fe31.netlify.app",
    "http://localhost:5173"
  ],
  credentials: true
}));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err.message));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupons", couponRoutes);

app.get("/", (req, res) => res.send("Trendify API running"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
