const router = require('express').Router();
const {
getThoughts, //get
createnewThoughts, //post
getSingleThought, //get
deleteThought, //delete
createReaction, //post
removeReaction,//delete
updateThought, //optional ,put






} = require('../../controllers/thoughtController');

//GET to get all thoughts & POST to create a new thought
// (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route("/").get(getThoughts).post(createnewThoughts);
//GET to get a single thought by its _id, and DELETE thought by its id
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);
//POST to create a reaction stored in a single thought's reactions array field
router.route('/:thoughtId/reactions').post(createReaction);
//DELETE to pull and remove a reaction by the reaction's reactionId value
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;