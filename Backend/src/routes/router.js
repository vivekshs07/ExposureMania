const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const postcontroller = require("../controllers/post-controller");
const fetchuser = require("../middlewares/fetchuser");
const upload = require("../middlewares/multer");
const messageController = require("../controllers/message-controller");

router.route("/signup").post(authcontroller.signup);
router.route("/login").post(authcontroller.login);
router.route("/logout").post(fetchuser,authcontroller.logout);
router.route("/posts").post(fetchuser,upload.single("file"),postcontroller.posts);



router.route("/comment/:id").post(fetchuser,postcontroller.comment);
router.route("/like/:id").get(fetchuser,postcontroller.like);
router.route("/dislike/:id").get(fetchuser,postcontroller.dislike);
router.route("/getcomments/:id").get(fetchuser,postcontroller.getcomments);
router.route("/getposts").get(fetchuser,postcontroller.getposts);
router.route("/getuser").get(fetchuser,authcontroller.getUser);
router.route("/getuserlikes/:id").get(fetchuser,postcontroller.getUserLike);
router.route("/getAllUser").get(fetchuser,authcontroller.getAllUsers);
router.route("/following/:followingId").post(fetchuser,authcontroller.following);
router.route("/getUserProfile/:username").get(fetchuser,authcontroller.getUserProfile);
router.route("/unfollow/:followingId").get(fetchuser,authcontroller.unfollow);
router.route("/getfollowers").get(fetchuser,authcontroller.getFollowers);
router.route("/getfollowing").get(fetchuser,authcontroller.getFollowing);
router.route("/deletepost/:id").delete(fetchuser,postcontroller.deletePostWithComments);
router.route("/getuserpost").get(fetchuser,postcontroller.getUserPost);
router.route("/editpost/:id").patch(fetchuser,upload.single("file"),postcontroller.editPost);
router.route("/editprofile").patch(fetchuser,authcontroller.editProfile);
router.route("/uploadprofileimage").patch(fetchuser,upload.single("file"),authcontroller.updatedAvatar);
router.route("/updatecoverimage").patch(fetchuser,upload.single("file"),authcontroller.updateCoverImage);  

router.route("/sendmessage/:id").post(fetchuser,messageController.sendMessage);
router.route("/getmessages/:id").get(fetchuser,messageController.getMessages);
module.exports = router;
