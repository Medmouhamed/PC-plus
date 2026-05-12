const mongoose = require("mongoose");

const motherboardSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  chipset: String,
  socket: String,
  formFactor: String,
  ramType: String,
  maxRamGB: Number,
  ramSlots: Number
});

module.exports = mongoose.model("Motherboard", motherboardSchema);