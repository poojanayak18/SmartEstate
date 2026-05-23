const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({

    title: String,

    location: String,

    pricePerSqFt: Number,

    totalPrice: Number,

    type: String,

    image: String,

    amenities: [String],

    nearbyPlaces: [String],

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model(
    "Property",
    propertySchema
);