const router = require('express').Router();
const {
getUsers,
updateUser,
SingleUser,
createUser,

} = require('../../controllers/userController');

router.route("/").get(getUsers).post(createUser)
router.route("/")


//POST to add a new friend to a user's friend list

//DELETE to remove a friend from a user's friend list


router.route('/api/users/:userId/friends/:friendId').post(addnewFriend).delete(removeFriend)