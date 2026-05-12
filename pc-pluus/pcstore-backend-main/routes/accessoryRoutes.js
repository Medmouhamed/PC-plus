const express = require("express");
const router = express.Router();
const Accessory = require("../models/Accessory");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const accessory = await Accessory.create(req.body);
  res.status(201).json(accessory);
});

router.get("/:productId", async (req, res) => {
  const accessory = await Accessory.findOne({ productId: req.params.productId });
  res.json(accessory);
});

router.put("/:productId", auth, async (req, res) => {
  const accessory = await Accessory.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(accessory);
});

router.delete("/:productId", auth, async (req, res) => {
  await Accessory.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "Accessory details deleted" });
});

module.exports = router;