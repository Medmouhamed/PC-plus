const express = require("express");
const router = express.Router();
const User = require("../models/users");
const auth = require("../middleware/auth");

router.post("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.favorites.includes(req.params.productId)) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    user.favorites.push(req.params.productId);
    await user.save();

    res.json({ message: "Added to favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      id => id.toString() !== req.params.productId
    );

    await user.save();
    res.json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;