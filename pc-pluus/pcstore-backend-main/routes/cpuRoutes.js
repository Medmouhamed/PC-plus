const express = require("express");
const router = express.Router();
const Cpu = require("../models/Cpu");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const cpu = await Cpu.create(req.body);
    res.status(201).json(cpu);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:productId", async (req, res) => {
  const cpu = await Cpu.findOne({ productId: req.params.productId });
  res.json(cpu);
});

router.put("/:productId", auth, async (req, res) => {
  const cpu = await Cpu.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(cpu);
});

router.delete("/:productId", auth, async (req, res) => {
  await Cpu.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "CPU details deleted" });
});

module.exports = router;