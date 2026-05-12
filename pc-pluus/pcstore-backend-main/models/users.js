const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],

    cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }
]

  },
  {
    timestamps: true
  }

);

const user = mongoose.model("User", userSchema);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
