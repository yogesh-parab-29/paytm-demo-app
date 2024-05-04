const express = require("express");
const { User, Account } = require("../db/database");
const router = express.router();

const authMiddleware = require("../middlewares/middleware");
const { default: mongoose } = require("mongoose");

router.get("/balance", authMiddleware, async (req, res) => {
  const user = await Account.findOne({
    userId: req.userId,
  });

  res.status(200).json({
    balance: user.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const fetchAccount = await Account.findOne({
    userId : req.userId
  })
});

module.exports = router;
