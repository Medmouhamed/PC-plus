const express = require("express");
const router = express.Router();
const Case = require("../models/Case");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const pcCase = await Case.create(req.body);
  res.status(201).json(pcCase);
});

router.get("/:productId", async (req, res) => {
  const pcCase = await Case.findOne({ productId: req.params.productId });
  res.json(pcCase);
});

router.put("/:productId", auth, async (req, res) => {
  const pcCase = await Case.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(pcCase);
});

router.delete("/:productId", auth, async (req, res) => {
  await Case.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "Case details deleted" });
});

module.exports = router;