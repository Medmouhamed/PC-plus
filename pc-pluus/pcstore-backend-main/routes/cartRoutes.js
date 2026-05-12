const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Product = require("../models/product");
const auth = require("../middleware/auth");


router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(req.user._id);

    const item = user.cart.find(i => i.product.toString() === productId);
    if (item) {
      item.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.product");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put("/:productId", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(i => i.product.toString() === req.params.productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    item.quantity = quantity;
    await user.save();

    res.json({ message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter(
      i => i.product.toString() !== req.params.productId
    );

    await user.save();
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;