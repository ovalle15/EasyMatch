const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user-model");
const express = require("express");
const router = express.Router();

router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  console.log("When /current is called",user);
  res.send(user);
});

router.post("/", async (req, res) => {

  // console.log("this is req", req)
  // validate the request body first
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  //find an existing user
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  console.log("This USER1 --->",user)

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
    // console.log("this is req", req)
  console.log("This USER2 --->",user)
  user.password = await bcrypt.hash(user.password, 10);
  const newuser = await User.insertMany(user);
  await user.save();
  // console.log("This USER --->",user)
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({
    _id: user._id,
    name: user.name,
    email: user.email
  });

});

module.exports = router;
