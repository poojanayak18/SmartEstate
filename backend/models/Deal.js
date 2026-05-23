const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({

  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },

  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  agreedPrice: {
    type: Number,
    required: true
  },

  commissionRate: {
    type: Number,
    default: 1
  },

  commissionAmount: {
    type: Number
  },

  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Deal", dealSchema);