const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
    unique: true
  },

  formFactorSupport: [String],
  fansIncluded: Number,
  rgb: Boolean
});

module.exports = mongoose.model("Case", caseSchema);