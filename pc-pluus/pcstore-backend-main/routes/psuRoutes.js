const express = require("express");
const router = express.Router();
const Psu = require("../models/Psu");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const psu = await Psu.create(req.body);
  res.status(201).json(psu);
});

router.get("/:productId", async (req, res) => {
  const psu = await Psu.findOne({ productId: req.params.productId });
  res.json(psu);
});

router.put("/:productId", auth, async (req, res) => {
  const psu = await Psu.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(psu);
});

router.delete("/:productId", auth, async (req, res) => {
  await Psu.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "PSU details deleted" });
});

module.exports = router;