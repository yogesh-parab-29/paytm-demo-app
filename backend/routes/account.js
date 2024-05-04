const express = require("express");
const { User, Account } = require("../db/database");
const router = express.router();

const authMiddleware = require("../middlewares/middleware");

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: user.balance,
  });
});

router.post('/transfer')

module.exports = router;
