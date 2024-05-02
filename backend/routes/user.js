const express = require("express");
const { signupUserSchema, signInUserSchema } = require("../types");
import { JWT_SECRET } from "../config";
const jwt = require("jsonwebtoken");
import { User } from "../db/database";
const {authMiddleware} = require('../middlewares/middleware')


const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstname, lastname, username, password } = req.body;
  const validateRequest = signupUserSchema.safeParse(req.body);
  if (!validateRequest.success) {
    return res.status(411).json({
      msg: "Incorrect input",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      msg: "User already exists",
    });
  }

  const user = await User.create({
    username,
    firstname,
    lastname,
    password,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    msg: "User created successfully",
    token: token,
  });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const { success } = signInUserSchema.safe(req.body);
  if (!{ success }) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const existingUser = await User.findOne({
    username,
    password,
  });

  if (!existingUser) {
    return res.status(411).json({
      msg: "Error while logging in",
    });
  }

  const token = jwt.sign(
    {
      userId: existingUser._id,
    },
    JWT_SECRET
  );

  return res.status(200).json({
    token,
  });
});

router.put("/",authMiddleware, async (req, res) => {

});

module.exports = router;