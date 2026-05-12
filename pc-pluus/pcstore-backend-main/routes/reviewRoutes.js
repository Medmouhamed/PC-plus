const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const auth = require("../middleware/auth");

router.post("/:productId", auth, async (req, res) => {
  try {
    const { comment, rating } = req.body;

    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = {
      user: req.user._id,
      comment,
      rating
    };

    product.reviews.push(review);
    await product.save();

    res.json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate("reviews.user", "name");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:productId/:reviewId", auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.find(r => r._id.toString() === req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    product.reviews = product.reviews.filter(r => r._id.toString() !== req.params.reviewId);
    await product.save();

    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;