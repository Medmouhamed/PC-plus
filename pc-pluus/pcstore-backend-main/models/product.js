const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: [
        "cpu",
        "gpu",
        "motherboard",
        "ram",
        "storage",
        "psu",
        "monitor",
        "case",
        "accessory"
      ],
      required: true
    },

    subCategory: {
      type: String

    },

    brand: { type: String, required: true },
    model: { type: String, required: true },

    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },

    warrantyMonths: Number,

    images: [String],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);