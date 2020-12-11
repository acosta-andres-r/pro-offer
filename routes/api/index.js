const router = require("express").Router();
const productRoutes = require("./products");
const cloudinaryRoutes = require("./cloudinary")

// Product routes
router.use("/products", productRoutes);

// Cloudinary routes
router.use("/cloudinary", cloudinaryRoutes);

module.exports = router;
