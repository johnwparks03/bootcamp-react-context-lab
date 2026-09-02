const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

// uuid, helps generate our unique ids
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws

module.exports = {
  signup,
  login,
};

async function signup(req, res) {
  console.log(req.body, " this is req.body");

  const user = new User(req.body); // data.Location is the url for your image on aws
  try {
    await user.save(); // user model .pre('save') function is running which hashes the password
    const token = createJWT(user);
    res.json({ token }); // set('toJSON',) in user model is being called, and deleting the users password from the token
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" },
  );
}
