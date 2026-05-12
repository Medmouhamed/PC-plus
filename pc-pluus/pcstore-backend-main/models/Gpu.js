const mongoose = require("mongoose");

const gpuSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  chipset: String,
  memoryGB: Number,
  memoryType: String,
  coreClockMHz: Number,
  boostClockMHz: Number,
  powerConsumptionW: Number
});

module.exports = mongoose.model("Gpu", gpuSchema);