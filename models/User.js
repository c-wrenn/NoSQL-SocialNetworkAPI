const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //email validation
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      
      toJSON: {
        virtuals: true,
      },
      id: false,
    }
  );
  
  // Virtual for friend count
  userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });
  
  // Initialize the User model
  const User = model("User", userSchema);
  
  module.exports = User;
    
