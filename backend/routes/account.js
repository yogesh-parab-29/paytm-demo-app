const express = require("express");
const { User, Account } = require("../db/database");
const router = express.Router();

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

  const { amount, to } = req.body;

  const fetchUserAccount = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!fetchUserAccount || fetchUserAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient Balance",
    });
  }

  const fetchTransferAccount = await Account.findOne({
    userId: to,
  }).session(session);
  if (!fetchTransferAccount) {
    await session.abortTransaction();
    return res.json({
      message: "Account doesnt exist",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});


module.exports = router;
