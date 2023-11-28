const router = require('express').Router();
const {
getUsers,
updateUser,
singleUser,
createUser,
deleteUser,
newFriend,
removeFriend

} = require('../../controllers/userController');
// GET all users & POST a new user
router.route("/").get(getUsers).post(createUser)
// GET a single user by its _id and populated thought and friend data
// PUT to update a user by its _id
// DELETE to remove user by its _id
router.route("/:userId").get(singleUser).delete(deleteUser).put(updateUser);

///api/users/:userId/friends/:friendId
//POST to add a new friend to a user's friend list & DELETE to remove a friend from a user's friend list
router.route("/:userId/friends/:friendId").post(newFriend).delete(removeFriend);
//DELETE to remove a friend from a user's friend list
router.route('/api/users/:userId/friends/:friendId').post(newFriend).delete(removeFriend)

module.exports = router;