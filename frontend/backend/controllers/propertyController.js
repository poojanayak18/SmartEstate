const Property = require("../models/Property");


// ADD PROPERTY
exports.addProperty = async (req, res) => {

  try {

    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);
    }

    const property = new Property({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      area: req.body.area,
      pricePerSqFt: req.body.pricePerSqFt,
      totalPrice: req.body.totalPrice,
      type: req.body.type,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      images,
      owner: req.user.id
    });

    await property.save();

    res.status(201).json({
      message: "Property added successfully",
      property
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// SEARCH PROPERTY
exports.searchProperties = async (req, res) => {

  try {

    const { location, minPrice, maxPrice, type } = req.query;

    let query = {
      documentsVerified: true
    };

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type) {
      query.type = type;
    }

    if (minPrice || maxPrice) {

      query.totalPrice = {};

      if (minPrice) query.totalPrice.$gte = Number(minPrice);
      if (maxPrice) query.totalPrice.$lte = Number(maxPrice);

    }

    const properties = await Property.find(query)
      .populate("owner", "name email");

    res.json({
      count: properties.length,
      properties
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// BUYER SENDS INTEREST
exports.sendInterest = async (req, res) => {

  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    property.interestedBuyers.push({
      buyer: req.user.id
    });

    await property.save();

    res.json({
      message: "Interest sent successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// OWNER APPROVES BUYER
exports.approveBuyer = async (req, res) => {

  try {

    const property = await Property.findById(req.params.propertyId);

    const interest = property.interestedBuyers.find(
      item => item.buyer.toString() === req.params.buyerId
    );

    if (!interest) {

      return res.status(404).json({
        message: "Buyer interest not found"
      });

    }

    interest.approved = true;

    await property.save();

    res.json({
      message: "Buyer approved successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};