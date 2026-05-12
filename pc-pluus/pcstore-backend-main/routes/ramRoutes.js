const express = require("express");
const router = express.Router();
const Ram = require("../models/Ram");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const ram = await Ram.create(req.body);
  res.status(201).json(ram);
});

router.get("/:productId", async (req, res) => {
  const ram = await Ram.findOne({ productId: req.params.productId });
  res.json(ram);
});

router.put("/:productId", auth, async (req, res) => {
  const ram = await Ram.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(ram);
});

router.delete("/:productId", auth, async (req, res) => {
  await Ram.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "RAM details deleted" });
});

module.exports = router;