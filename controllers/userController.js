//User controller

const User = require("../models/User");

module.exports = {
  // to get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //to get a single user
  async singleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userId });
      if (!singleUser) {
        return res.status(404).json({ message: "No user found with that ID" });
      }

      res.json(singleUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // to create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update user
};
