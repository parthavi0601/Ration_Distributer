const express = require("express");
const { getInventory, placeOrder } = require("../controllers/userController");
const router = express.Router();

router.get("/inventory", getInventory);
router.post("/place-order", placeOrder);

module.exports = router;
