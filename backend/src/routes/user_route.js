const express = require("express");
const router = express.Router();

const {isAuthenticated} = require("../../middlewares/isauthenticated");
const {uplaod} = require("../../middlewares/multer");
const { get_user_profile, editProfile, update_user_password, user_logout } = require("../controllers/user_controller");


const {
  user_login,
  user_register,

} = require("../controllers/user_controller");

router.route("/register").post(user_register);
router.route("/login").post(user_login);
router.route("/:id/profile").get(isAuthenticated, get_user_profile);
router.route("/profile/editProfile").post(isAuthenticated, editProfile);
router.route("/profile/update/password").post(isAuthenticated, update_user_password);
router.route("/logout").get(isAuthenticated, user_logout);




module.exports = router;
