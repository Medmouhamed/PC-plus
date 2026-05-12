const express = require("express");
const router = express.Router();
const Gpu = require("../models/Gpu");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const gpu = await Gpu.create(req.body);
  res.status(201).json(gpu);
});

router.get("/:productId", async (req, res) => {
  const gpu = await Gpu.findOne({ productId: req.params.productId });
  res.json(gpu);
});

router.put("/:productId", auth, async (req, res) => {
  const gpu = await Gpu.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(gpu);
});

router.delete("/:productId", auth, async (req, res) => {
  await Gpu.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "GPU details deleted" });
});

module.exports = router;