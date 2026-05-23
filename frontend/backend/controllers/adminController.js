const User = require("../models/User");
const Property = require("../models/Property");
const Deal = require("../models/Deal");

exports.getDashboardStats = async (req, res) => {
  try {

    // OPTIONAL: Restrict to admin only
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can access dashboard"
      });
    }

    const totalUsers = await User.countDocuments();

    const totalProperties = await Property.countDocuments();

    const verifiedProperties = await Property.countDocuments({
      documentsVerified: true
    });

    const totalDeals = await Deal.countDocuments();

    const deals = await Deal.find();

    let totalCommission = 0;

    deals.forEach(deal => {
      totalCommission += deal.commissionAmount || 0;
    });

    res.json({
      totalUsers,
      totalProperties,
      verifiedProperties,
      totalDeals,
      totalCommission
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};