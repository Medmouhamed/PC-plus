const express = require("express");
const router = express.Router();
const Monitor = require("../models/Monitor");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const monitor = await Monitor.create(req.body);
  res.status(201).json(monitor);
});

router.get("/:productId", async (req, res) => {
  const monitor = await Monitor.findOne({ productId: req.params.productId });
  res.json(monitor);
});

router.put("/:productId", auth, async (req, res) => {
  const monitor = await Monitor.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(monitor);
});

router.delete("/:productId", auth, async (req, res) => {
  await Monitor.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "Monitor details deleted" });
});

module.exports = router;