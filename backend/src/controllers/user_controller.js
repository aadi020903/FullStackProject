const user_model = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { default: cloudinary } = require("../../public/utils/cloudinary");

exports.user_register = async (req, res) => {
  const { username, Name, email, password } = req.body;
  if (!username || !Name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }
  try {
    const existingUser = await user_model.findOne({
      email: email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists Try Different Email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user_model.create({
      username,
      Name,
      password: hashedPassword,
      email,
    });

    if (newUser) {
      return res.status(200).json({
        message: "User created successfully",
        success: true,
      });
    } else {
      return res.status(400).json({
        message: "Failed to create user",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.user_login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }
  try {
    const user = await user_model.findOne({
      email: email,
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user = {
      id: user._id,
      username: user.username,
      email: user.email,
      Name: user.Name,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      post: user.posts,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome ${user.username}`,
        success: true,
        user: user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.user_logout = async (_, res) => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await user_model.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User found",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
exports.editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { username, Name, bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;
    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }
    const user = await user_model.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (username) {
      user.username = username;
    }
    if (Name) {
      user.Name = Name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (gender) {
      user.gender = gender;
    }
    if (profilePicture) {
      user.profilePicture = cloudResponse.secure_url;
    }

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await user_model
      .find({ _id: { $ne: req.id } })
      .select("-password");
    if (!suggestedUsers) {
      return res.status(400).json({
        message: "No users found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Suggested users found",
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.followUser = async (req, res) => {
  try {
    const followkrneWala = req.id;
    const followHoneWala = req.params.id;
    if (followkrneWala === followHoneWala) {
      return res.status(400).json({
        message: "You cannot follow yourself",
        success: false,
      });
    }

    const user = await user_model.findById(followkrneWala);
    const userToFollow = await user_model.findById(followHoneWala);
    if (!user || !userToFollow) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    const followss = user.following.includes(followHoneWala);
    if (followss) {
      // unflollow krna h
      await Promise.all([
        user.updateOne(
          { _id: followkrneWala },
          { $pull: { following: followHoneWala } }
        ),
        userToFollow.updateOne(
          { _id: followHoneWala },
          { $pull: { followers: followkrneWala } }
        ),
      ]);

      return res.status(200).json({
        message: "User unfollowed successfully",
        success: true,
      });

    } else {
      // follow krna h
      await Promise.all([
        user.updateOne(
          { _id: followkrneWala },
          { $push: { following: followHoneWala } }
        ),
        userToFollow.updateOne(
          { _id: followHoneWala },
          { $push: { followers: followkrneWala } }
        ),
      ]);

      return res.status(200).json({
        message: "User followed successfully",
        success: true,
      });
    }
  } catch (error) {}
};
