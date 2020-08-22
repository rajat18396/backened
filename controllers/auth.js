const User = require("../models/user");
const ShortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const user = require("../models/user");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is Already Taken",
      });
    }
    const { name, email, password } = req.body;
    let userName = ShortId.generate();
    let profile = `${process.env.PROD_URL}/profile/${userName}`;

    let newUser = new User({ name, email, password, profile, userName });

    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      //   res.json({
      //     user: success,
      //   });
      res.json({
        message: "Sign Up Success",
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Does not exixt, please SignUp",
      });
    }

    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and Password do not match",
      });
    }

    //generate a token and sent it to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });

    const { _id, userName, name, email, role } = user;
    return res.json({
      token,
      user: { _id, userName, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
