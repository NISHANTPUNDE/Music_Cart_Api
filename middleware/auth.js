const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.checkUser = async (req, res, next) => {
  const token = req.body.token
  // console.log("token:", req.body)
  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decodedToken._id);
      
      if (user) {
        console.log("user:", user)
        res.json({ status: true, user: { name: user.name, email: user.email } });
      } else {
        res.json({ status: false });
      }
    } else {
      res.json({ status: false });
    }
  } catch (err) {
    console.error("Error verifying token:", err);
    res.json({ status: false });
  }
};
