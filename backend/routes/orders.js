const express = require("express");
const router = express.Router();
const pool = require("../db");

// ---------------------
// Place New Order
// ---------------------
router.post("/new", async (req, res) => {
  const { userId, itemId, qty } = req.body;

  try {
    // 1. Check current total ration taken by this user (for this item in current month)
    const userTotal = await pool.query(
      `SELECT COALESCE(SUM(qty), 0) as total_qty
       FROM orders 
       WHERE user_id = $1 
         AND item_id = $2
         AND DATE_TRUNC('month', created_at) = DATE_TRUNC('month', CURRENT_DATE)`,
      [userId, itemId]
    );

    const totalSoFar = parseInt(userTotal.rows[0].total_qty);

    // 2. Ration limits per item (kg per month)
    const rationLimits = {
      1: 5,  // Rice -> 5kg
      2: 10, // Wheat -> 10kg
      3: 2   // Sugar -> 2kg
    };

    const rationLimit = rationLimits[itemId] || 0;

    if (totalSoFar + qty > rationLimit) {
      return res.json({
        success: false,
        message: `❌ Limit exceeded. You can only claim ${rationLimit}kg this month for this item.`,
      });
    }

    // 3. Check inventory availability
    const invCheck = await pool.query("SELECT quantity FROM inventory WHERE id=$1", [itemId]);
    if (invCheck.rows.length === 0 || invCheck.rows[0].quantity < qty) {
      return res.json({
        success: false,
        message: "❌ Not enough stock available.",
      });
    }

    // 4. Insert order (use `qty` column)
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, item_id, qty, created_at) 
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [userId, itemId, qty]
    );

    // 5. Reduce inventory
    await pool.query("UPDATE inventory SET quantity = quantity - $1 WHERE id=$2", [qty, itemId]);

    res.json({
      success: true,
      order: orderResult.rows[0],
      message: "✅ Order placed successfully!",
    });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT o.id, o.user_id, o.item_id, o.qty, o.created_at, i.name as item_name
       FROM orders o
       JOIN inventory i ON o.item_id = i.id
       WHERE o.user_id = $1
       ORDER BY o.created_at DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch user orders error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------------
// Get All Orders
// ---------------------
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id, o.user_id, o.item_id, o.qty, o.created_at, i.name as item_name
       FROM orders o
       JOIN inventory i ON o.item_id = i.id
       ORDER BY o.created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
