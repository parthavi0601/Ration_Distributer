const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all inventory items
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching inventory" });
  }
});

// Update inventory after order (optional if you need admin control)
router.post("/update", async (req, res) => {
  const { itemId, newQty } = req.body;
  try {
    await pool.query("UPDATE inventory SET quantity=$1 WHERE id=$2", [newQty, itemId]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating inventory" });
  }
});

module.exports = router;
