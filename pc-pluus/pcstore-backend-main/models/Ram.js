const mongoose = require("mongoose");

const ramSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  capacityGB: Number,
  type: String,
  speedMHz: Number,
  sticks: Number
});

module.exports = mongoose.model("Ram", ramSchema);