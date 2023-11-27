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




//delete user by its id
async deleteUser(req, res) {
  try {
    const removeUser = await User.findOneAndRemove({ _id: req.params.userId });
    res.json(removeUser);
  } catch (err) {
    res.status(500).json(err);
  }
},
//newFriend
async newFriend (req,res) {
  try {
    
    const currentUser = await User.findById({_id: req.params.userId});
    const addedFriend = await User.findById({_id: req.params.friendId});
    // push new friend
    currentUser.friends.push(addedFriend);

    await currentUser.save();

    res.json(currentUser);
  } catch (error) {
    res.status(500).json(error);
  }
},
//removeFriend
async removeFriend (req, res) {
  try {
    const ourUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (!ourUser) {
      return res
        .status(404)
        .json({ message: "Cannot find user!" });
    }

    res.json(ourUser);
  } catch (err) {
    res.status(500).json(err);
  }
},

};
