const { ObjectId } =require('mongoose').Types;
const { Schema, model } = require('mongoose');

// Importing dayjs
const dayjs = require("dayjs");

// define Reaction Schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        },
    },
}
);



const thoughtSchema = new Schema(
    {
    thoughtText: { 
        type: String,
        required: true ,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: () => dayjs().toDate(),
        //getter method to format the timestamp on query
        get: (timestamp) => dayjs(timestamp).format("MMM DD, YYYY [at] HH:mm:ss A"), 
    
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
  },
//   reactions: [reactionSchema],

  { // convert to JSON
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
  });



//virtual for reaction
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

//Initialize model
const Thought = model("Thought", thoughtSchema)

//Export model
module.exports = Thought;