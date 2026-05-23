const Deal = require("../models/Deal");
const Property = require("../models/Property");



// CREATE DEAL
exports.createDeal = async (req, res) => {

  try {

    if (req.user.role !== "owner") {
      return res.status(403).json({
        message: "Only owner can create deal"
      });
    }

    const { propertyId, buyerId, agreedPrice } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    const commissionRate = 1;

    const commissionAmount = (agreedPrice * commissionRate) / 100;

    const deal = new Deal({
      property: propertyId,
      buyer: buyerId,
      seller: req.user.id,
      agreedPrice,
      commissionRate,
      commissionAmount
    });

    await deal.save();

    res.status(201).json({
      message: "Deal created successfully",
      deal
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// COMPLETE DEAL
exports.completeDeal = async (req, res) => {

  try {

    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found"
      });
    }

    deal.status = "completed";

    await deal.save();

    res.json({
      message: "Deal completed successfully",
      commissionEarned: deal.commissionAmount
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};