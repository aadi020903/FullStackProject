const user_model = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");


exports.user_register = async (req, res) => {
  const {
    username,
    email,
    mobile,
    password,
  } = req.body;
  try {
    const existingUser = await user_model.findOne({ 
      $or: [
        { mobile: mobile },
        { email: email }
      ]
    });
    if (existingUser) {
      return {
        message: "User already exists",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user_model.create({
      username,
      mobile,
      password: hashedPassword,
      email,

    });

    if (newUser) {
      return {
        message: "User created successfully",
        success: true,
      };
    } else {
      return {
        message: "User creation failed",
        success: false,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};
