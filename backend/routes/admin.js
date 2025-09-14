const express = require("express");
const { getInventory, getOrders } = require("../controllers/adminController");
const router = express.Router();

router.get("/inventory", getInventory);
router.get("/orders", getOrders);

module.exports = router;
