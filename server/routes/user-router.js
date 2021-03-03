const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user-model");
const express = require("express");
const router = express.Router();




router.get("/current", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  // res.header("x-auth-token", token).send({
  //   _id: user._id,
  //   name: user.name,
  //   email: user.email
  // });
  console.log("When ----/current---- is called",user);

  console.log("this is req", req);
  console.log("this is res", res);
  res.send(user);
});


router.get("/all", async(req, res) => {
    await User.find({}, (err, users) => {
      if (err) {
          console.error(`400 in 'getusers': ${err}`);
          return res
              .status(400)
              .json({
                  success: false,
                  error: err,
              });
      }
      if (!users.length) {
          console.error(`404 in 'getusers': Items not found`);
          return res
              .status(404)
              .json({
                  success: false,
                  error: 'Items not found',
              });
      }
      console.log(`200 in 'getusers': Items fetched!`);
      return res
          .status(200)
          .json({
              success: true,
              items: users,
          });
  }).catch(err => {
      console.error(`caught error in 'getusers': ${err}`);
      console.error(err);
      return res
          .status(404)
          .json({
              success: false,
              error: err
          });
  });
})

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
