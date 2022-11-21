const mongoose = require("mongoose");
const User = mongoose.model("user");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "User was registered successfully!" });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    var token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    var authorities = [];

    res.status(200).send({
      id: user._id,
      email: user.email,
      accessToken: token,
    });
  });
};

exports.allusers = (req, res) => {
  User.find({}).exec((err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!users) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).send({
      users,
    });
  });
};

exports.checkauth = (req, res) => {
 
  res.status(200).send("true");
};
