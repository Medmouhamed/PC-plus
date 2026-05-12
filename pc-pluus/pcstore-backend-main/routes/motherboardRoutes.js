const express = require("express");
const router = express.Router();
const Motherboard = require("../models/Motherboard");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const mb = await Motherboard.create(req.body);
  res.status(201).json(mb);
});

router.get("/:productId", async (req, res) => {
  const mb = await Motherboard.findOne({ productId: req.params.productId });
  res.json(mb);
});

router.put("/:productId", auth, async (req, res) => {
  const mb = await Motherboard.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(mb);
});

router.delete("/:productId", auth, async (req, res) => {
  await Motherboard.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "Motherboard details deleted" });
});

module.exports = router;