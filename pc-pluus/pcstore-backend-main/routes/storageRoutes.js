const express = require("express");
const router = express.Router();
const Storage = require("../models/Storage");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const storage = await Storage.create(req.body);
  res.status(201).json(storage);
});

router.get("/:productId", async (req, res) => {
  const storage = await Storage.findOne({ productId: req.params.productId });
  res.json(storage);
});

router.put("/:productId", auth, async (req, res) => {
  const storage = await Storage.findOneAndUpdate(
    { productId: req.params.productId },
    req.body,
    { new: true }
  );
  res.json(storage);
});

router.delete("/:productId", auth, async (req, res) => {
  await Storage.findOneAndDelete({ productId: req.params.productId });
  res.json({ message: "Storage details deleted" });
});

module.exports = router;