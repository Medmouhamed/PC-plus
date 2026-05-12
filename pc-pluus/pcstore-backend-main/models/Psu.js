const mongoose = require("mongoose");

const psuSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  wattage: Number,
  efficiency: String, 
  modular: Boolean
});

module.exports = mongoose.model("Psu", psuSchema);