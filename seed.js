require("dotenv").config();
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Models/User");
const Coupon = require("./Models/Coupon");
const Product = require("./Models/Product");

const products = [
  // MEN
  {
    name: "Men's Classic White Oxford Shirt",
    description: "A timeless white Oxford shirt crafted from 100% cotton. Perfect for office wear or casual outings.",
    price: 1299,
    category: "men",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500"],
    colors: ["White", "Light Blue", "Grey"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
  },
  {
    name: "Men's Slim Fit Chino Pants",
    description: "Modern slim-fit chinos in a versatile khaki shade. Great for smart-casual looks.",
    price: 1799,
    category: "men",
    images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500"],
    colors: ["Khaki", "Navy", "Olive", "Black"],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 40,
  },
  {
    name: "Men's Graphic Tee — Urban Vibes",
    description: "Relaxed fit graphic tee with bold street-art print. Made from soft jersey cotton.",
    price: 699,
    category: "men",
    images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"],
    colors: ["Black", "White", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    stock: 80,
  },
  {
    name: "Men's Denim Jacket",
    description: "Classic indigo denim jacket with a slightly oversized cut. A wardrobe staple for every season.",
    price: 2499,
    category: "men",
    images: ["https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500"],
    colors: ["Indigo", "Light Wash", "Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 30,
  },
  {
    name: "Men's Formal Blazer",
    description: "Sharp single-breasted blazer in premium wool blend. Ideal for meetings and events.",
    price: 3999,
    category: "men",
    images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500"],
    colors: ["Navy", "Charcoal", "Black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 25,
  },
  {
    name: "Men's Jogger Sweatpants",
    description: "Ultra-soft fleece joggers with elastic waistband and tapered fit. Perfect for lounging or workouts.",
    price: 999,
    category: "men",
    images: ["https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500"],
    colors: ["Grey", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: 60,
  },

  // WOMEN
  {
    name: "Women's Floral Wrap Dress",
    description: "Elegant wrap dress with a vibrant floral print. Flowy fabric perfect for summer days.",
    price: 1599,
    category: "women",
    images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500"],
    colors: ["Floral Pink", "Floral Blue", "Floral Yellow"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 45,
  },
  {
    name: "Women's High-Waist Skinny Jeans",
    description: "Flattering high-waist skinny jeans in stretch denim. All-day comfort with a sleek silhouette.",
    price: 1999,
    category: "women",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500"],
    colors: ["Blue", "Black", "White"],
    sizes: ["24", "26", "28", "30", "32"],
    stock: 50,
  },
  {
    name: "Women's Oversized Knit Sweater",
    description: "Cozy oversized sweater in a chunky ribbed knit. Great for layering in cooler months.",
    price: 1899,
    category: "women",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"],
    colors: ["Cream", "Dusty Rose", "Sage Green", "Camel"],
    sizes: ["S", "M", "L"],
    stock: 35,
  },
  {
    name: "Women's Linen Blazer",
    description: "Lightweight linen blazer with a relaxed single-button silhouette. Effortless and chic.",
    price: 2799,
    category: "women",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4237?w=500"],
    colors: ["Beige", "White", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 28,
  },
  {
    name: "Women's Pleated Midi Skirt",
    description: "Elegant pleated midi skirt in satin finish. Pairs well with both casual and dressy tops.",
    price: 1199,
    category: "women",
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500"],
    colors: ["Blush", "Black", "Navy", "Emerald"],
    sizes: ["XS", "S", "M", "L"],
    stock: 40,
  },
  {
    name: "Women's Cropped Hoodie",
    description: "Trendy cropped hoodie in a soft cotton-blend fleece. Sporty yet stylish.",
    price: 1099,
    category: "women",
    images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500"],
    colors: ["Lavender", "White", "Black", "Coral"],
    sizes: ["XS", "S", "M", "L"],
    stock: 55,
  },

  // KIDS
  {
    name: "Kids' Dino Print T-Shirt",
    description: "Fun and bright dinosaur print tee for little ones. Soft cotton, easy to wash.",
    price: 449,
    category: "kids",
    images: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500"],
    colors: ["Green", "Blue", "Orange"],
    sizes: ["2Y", "3Y", "4Y", "5Y", "6Y"],
    stock: 70,
  },
  {
    name: "Kids' Cargo Shorts",
    description: "Durable cargo shorts with plenty of pockets for adventurous kids.",
    price: 599,
    category: "kids",
    images: ["https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=500"],
    colors: ["Khaki", "Navy", "Olive"],
    sizes: ["4Y", "5Y", "6Y", "7Y", "8Y"],
    stock: 45,
  },
  {
    name: "Kids' Zip-Up Hoodie",
    description: "Warm and cozy zip-up hoodie perfect for school days and playtime.",
    price: 899,
    category: "kids",
    images: ["https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500"],
    colors: ["Red", "Grey", "Navy", "Black"],
    sizes: ["4Y", "6Y", "8Y", "10Y", "12Y"],
    stock: 40,
  },
  {
    name: "Kids' Floral Dress",
    description: "Sweet floral print dress with smocked bodice. Perfect for parties and outings.",
    price: 799,
    category: "kids",
    images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500"],
    colors: ["Pink", "Yellow", "Blue"],
    sizes: ["2Y", "3Y", "4Y", "5Y", "6Y"],
    stock: 35,
  },
  {
    name: "Kids' Jogger Set",
    description: "Matching 2-piece jogger set with soft fleece fabric. Comfortable for everyday wear.",
    price: 1099,
    category: "kids",
    images: ["https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500"],
    colors: ["Grey", "Navy", "Black"],
    sizes: ["4Y", "6Y", "8Y", "10Y"],
    stock: 30,
  },

  // BABY
  {
    name: "Baby Soft Cotton Onesie",
    description: "Ultra-soft 100% organic cotton onesie for newborns. Gentle on sensitive skin.",
    price: 349,
    category: "baby",
    images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500"],
    colors: ["White", "Yellow", "Mint", "Pink"],
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M"],
    stock: 100,
  },
  {
    name: "Baby Knit Romper",
    description: "Adorable knit romper with button snaps at the bottom for easy diaper changes.",
    price: 549,
    category: "baby",
    images: ["https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=500"],
    colors: ["Cream", "Dusty Pink", "Sky Blue"],
    sizes: ["0-3M", "3-6M", "6-12M"],
    stock: 60,
  },
  {
    name: "Baby Fleece Sleepsuit",
    description: "Cozy all-in-one fleece sleepsuit with zip front. Keeps baby warm all night.",
    price: 699,
    category: "baby",
    images: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500"],
    colors: ["Grey", "White", "Lavender"],
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M", "12-18M"],
    stock: 55,
  },
  {
    name: "Baby Sun Hat & Bodysuit Set",
    description: "Matching sun hat and bodysuit set in breathable cotton. Great for sunny outings.",
    price: 799,
    category: "baby",
    images: ["https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500"],
    colors: ["Yellow", "Coral", "Mint"],
    sizes: ["3-6M", "6-12M", "12-18M"],
    stock: 40,
  },
];

mongoose.connect(process.env.MONGO_URL).then(async () => {
  // Admin
  const hashed = await bcrypt.hash("admin123", 10);
  await User.findOneAndUpdate(
    { email: "admin@trendify.com" },
    { name: "Admin", email: "admin@trendify.com", password: hashed, isAdmin: true },
    { upsert: true }
  );

  // Coupons
  const coupons = [
    { code: "TREND10", discount: 10 },
    { code: "FASHION20", discount: 20 },
    { code: "STYLE50", discount: 50 },
  ];
  for (const c of coupons) {
    await Coupon.findOneAndUpdate({ code: c.code }, c, { upsert: true });
  }

  // Products
  for (const p of products) {
    await Product.findOneAndUpdate({ name: p.name }, p, { upsert: true });
  }

  console.log(`✅ Seeded admin, coupons, and ${products.length} products`);
  mongoose.disconnect();
});
