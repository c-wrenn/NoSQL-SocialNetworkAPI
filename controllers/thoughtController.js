//thought controller

const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //get a Single Thought using id
  async getSingleThought(req, res) {
    try {
      const singleThought = await User.findOne({ _id: req.params.userId });
      if (!singleThought) {
        return res.status(404).json({ message: "No thought found with that ID" });
      }

      res.json(singleThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// post new thought
  async createnewThoughts(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update thoughts


  //delete thoughts


  //create reaction

  //



  // create a new post
  async createnewThoughts(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Post created, but found no user with that ID' });
      }

      res.json('Created the post 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  
};
