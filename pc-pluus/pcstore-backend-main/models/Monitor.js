const mongoose = require("mongoose");

const monitorSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  sizeInch: Number,
  resolution: String,
  refreshRateHz: Number,
  panelType: String
});

module.exports = mongoose.model("Monitor", monitorSchema);