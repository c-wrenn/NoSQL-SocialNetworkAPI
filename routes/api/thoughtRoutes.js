const router = require('express').Router();
const {
getThoughts,
getSingleThought,
createnewThoughts,


} = require('../../controllers/thoughtController');


router.route("/api/thoughts").get(getThoughts).get(getSingleThought)

router.route("/api/thoughts").post(createnewThoughts)