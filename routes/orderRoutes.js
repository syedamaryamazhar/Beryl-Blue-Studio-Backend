const express = require("express");
const router = express.Router();
const db = require("../config/db");
router.post("/checkout", (req, res) => {
  console.log("📦 REQUEST BODY:", req.body);

  const {
    name,
    phone,
    email,
    address,
    payment,
    subtotal,
    shipping,
    total,
  } = req.body;

  if (!name || !phone || !email || !address || !payment) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const sql = `
    INSERT INTO orders 
    (name, phone, email, address, payment, subtotal, shipping, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      phone,
      email,
      address,
      payment,
      Number(subtotal),
      Number(shipping),
      Number(total),
    ],
    (err, result) => {
      if (err) {
        console.error("❌ MYSQL ERROR:", err);
        return res.status(500).json({ message: err.sqlMessage });
      }

      res.status(200).json({
        message: "Order placed successfully",
        orderId: result.insertId,
      });
    }
  );
});


module.exports = router;
