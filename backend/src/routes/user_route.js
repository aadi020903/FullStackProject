import express from "express";

const router = express.Router();

import  isAuthenticated  from "../../middlewares/isauthenticated.js";
import upload from "../../middlewares/multer.js";

import {
  get_user_profile,
  editProfile,
  update_user_password,
  user_logout,
  get_suggested_users,
  follow_user,
} from "../controllers/user_controller.js";


const { user_login, user_register } = require("../controllers/user_controller");

router.route("/register").post(user_register);
router.route("/login").post(user_login);
router.route("/:id/profile").get(isAuthenticated, get_user_profile);
router
  .route("/profile/editProfile")
  .post(isAuthenticated, upload.single("profileImage"), editProfile);
router
  .route("/profile/update/password")
  .post(isAuthenticated, update_user_password);
router.route("/logout").get(isAuthenticated, user_logout);
router.router("/suggested").get(isAuthenticated, get_suggested_users);
router.router("/follow/:id").post(isAuthenticated, follow_user);

export default router;
