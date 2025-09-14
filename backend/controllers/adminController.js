const pool = require("../db");

exports.getInventory = async (req, res) => {
  const result = await pool.query("SELECT * FROM inventory");
  res.json(result.rows);
};

exports.getOrders = async (req, res) => {
  const result = await pool.query("SELECT * FROM orders");
  res.json(result.rows);
};
