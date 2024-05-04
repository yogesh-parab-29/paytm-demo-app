const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://yogeshparab11312:Yogesh2905@cluster2905.lmfndco.mongodb.net/paytm_backend"
);

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
});

const accountSchema = new User.Schema({
  userId: {
    types: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("User", userSchema);

module.exports = {
  User,
  Account,
};
