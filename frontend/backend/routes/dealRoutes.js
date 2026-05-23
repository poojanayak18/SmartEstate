const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createDeal,
  completeDeal
} = require("../controllers/dealController");



router.post(
  "/create",
  protect,
  createDeal
);


router.put(
  "/complete/:id",
  protect,
  completeDeal
);

module.exports = router;