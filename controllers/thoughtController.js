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
      const singleThought = await Thought.findOne({ _id: req.params.thoughtId });
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

      // const user = await User.findOneAndUpdate(
      //   { _id: req.body.userId },
      //   { $addToSet: { thoughts: thought._id } },
      //   { new: true }
      // );
      // if (!user) {
      //   return res
      //     .status(404)
      //     .json({ message: 'Post created, but found no user with that ID' });
      // }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update thoughts


  //delete thought by id
async deleteThought(req, res) {
    try {
      const deleteThoughts = await Thought.findOne({ _id: req.params.thoughtId });
      if (!deleteThoughts) {
        return res.status(404).json({ message: "No thought found with that ID to delete!" });
      }

      res.json(deleteThoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const findThoughtId = req.params.thoughtId;

      const targetThought = await Thought.findById(findThoughtId);
//If it is not the targeted thought send error
      if (!targetThought) {
        return res.status(404).json({ message: "No Thought found with that id" });
      }
      const addReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };
      console.log(addReaction)
   // (don't forget to push the created reaction to the associated thoughts
      targetThought.reactions.push(addReaction);
      //save reaction to the thought
      await targetThought.save();

      res.json(targetThought);
    } catch (error) {
      res.status(500).json(error);
    }
},
  //remove reaction
  async removeReaction(req, res) {
    try {
      const findThoughtId = req.params.thoughtId;
      const findReactionId= req.params.reactionId;

      const targetThought = await Thought.findById(findThoughtId);
//If it is not the targeted thought send error
      if (!targetThought) {
        return res.status(404).json({ message: "No Thought found with that id" });
      }
      targetThought.reactions.pull(findReactionId);
     
      await targetThought.save();

      res.json(targetThought);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
