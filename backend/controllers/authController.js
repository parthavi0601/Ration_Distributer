const pool = require("../db");

exports.userLogin = async (req, res) => {
  const { rationCard, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE rationcard=$1 AND password=$2", [rationCard, password]);
  
  if (result.rows.length > 0) {
    res.json({ success: true, user: result.rows[0] });
  } else {
    res.json({ success: false });
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("SELECT * FROM admins WHERE username=$1 AND password=$2", [username, password]);
  
  if (result.rows.length > 0) {
    res.json({ success: true, admin: result.rows[0] });
  } else {
    res.json({ success: false });
  }
};
