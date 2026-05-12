const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  type: {
    type: String,
    enum: ["mouse", "keyboard", "headset"],
    required: true
  },

  connection: String,
  rgb: Boolean
});

module.exports = mongoose.model("Accessory", accessorySchema);