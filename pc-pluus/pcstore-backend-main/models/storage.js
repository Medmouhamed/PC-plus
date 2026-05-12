const mongoose = require("mongoose");

const storageSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  type: {
    type: String,
    enum: ["ssd", "hdd"],
    required: true
  },

  capacityGB: Number,
  interface: String,
  readSpeedMBs: Number,
  writeSpeedMBs: Number
});

module.exports = mongoose.model("Storage", storageSchema);