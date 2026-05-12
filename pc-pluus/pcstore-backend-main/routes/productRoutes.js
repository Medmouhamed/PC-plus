const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");
const adminOnly = require("../middleware/admin");


router.post("/", auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      userId: req.user._id
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const {
      category,
      subCategory,
      brand,
      minPrice,
      maxPrice
    } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;

    if (brand) {
      filter.brand = new RegExp(`^${brand}$`, "i"); 
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("userId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not allowed" });

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;