const pool = require("../db");

exports.getInventory = async (req, res) => {
  const result = await pool.query("SELECT * FROM inventory");
  res.json(result.rows);
};

exports.placeOrder = async (req, res) => {
  const { rationCard } = req.body;
  await pool.query("INSERT INTO orders(rationcard, status) VALUES($1, $2)", [rationCard, "PENDING"]);
  res.json({ message: "Order placed successfully!" });
};
