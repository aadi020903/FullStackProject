import jwt from "jsonwebtoken";

const isauthenticated = async (req, res, next) => {
  try {
    const tokenHead = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "User is not authenicated", success: false });
    }
    const jwtPassword = process.env.JWT_SECRET;
    const decode = jwt.verify(token, jwtPassword);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return {
      message: error.message || "Internal server error",
      success: false,
    };
  }
};
