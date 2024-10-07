import express from "express";

const router = express.Router();

import  isAuthenticated  from "../../middlewares/isauthenticated.js";
import upload from "multer";

import {
  getProfile,
  editProfile,
  userRegister,
  userLogin,
  userLogout,
  getSuggestedUsers,
  followUser,
} from "../controllers/user_controller.js";


router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/:id/profile").get(isAuthenticated, getProfile);
// router
//   .route("/profile/editProfile")
//   .post(isAuthenticated, upload.single("profileImage"), editProfile);

router.route("/logout").get(isAuthenticated, userLogout);
router.route("/suggested").get(isAuthenticated, getSuggestedUsers);
router.route("/follow/:id").post(isAuthenticated, followUser);

export default router;
