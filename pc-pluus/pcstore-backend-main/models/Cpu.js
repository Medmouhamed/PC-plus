const mongoose = require("mongoose");

const cpuSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  cores: Number,
  threads: Number,
  socket: String,
  baseClockGHz: Number,
  boostClockGHz: Number,
  tdpWatt: Number,
  integratedGraphics: Boolean
});

module.exports = mongoose.model("Cpu", cpuSchema);