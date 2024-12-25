import userModel from "../../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  if (!userEmail || !userPassword) {
    return res
      .status(200)
      .json({ success: false, status: "Error", message: "Please provide all the fields" });
  }

  const userAvailable = await userModel.findOne({ userEmail });

  if (!userAvailable) {
    return res.status(200).json({
      success: false,
      status: "Error",
      message: "User not found with this email",
    });
  }

  if (
    userAvailable &&
    (await bcrypt.compare(userPassword, userAvailable.userPassword))
  ) {
    let token = jwt.sign(
      {

        id: userAvailable._id,
        userName: userAvailable.userName,
        email: userAvailable.userEmail,
        role: userAvailable.userRole,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "100m" }
    );


    return res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      status: "Success",
      message: "Logged in successfully",
      user: {

        id: userAvailable._id,
        userName: userAvailable.userName,
        email: userAvailable.userEmail,
        role: userAvailable.userRole,
      }

    });

  } else {
    return res.status(200).json({
      success: false,
      status: "Error",
      message: "Invalid Credentials",
    });
  }
};
const register = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  if (!userName || !userEmail || !userPassword) {
    return res
      .status(200)
      .json({ success: false, status: "Error", message: "Please provide all the fields" });
  }

  const userAvailable = await userModel.findOne({ userEmail });

  if (userAvailable) {
    return res.status(200).json({
      success: false,
      status: "Error",
      message: "User Already exists with this email",
    });
  }

  const hashedPassword = await bcrypt.hash(userPassword, 10);

  const user = await userModel.create({
    userName,
    userEmail,
    userRole: "user",
    userPassword: hashedPassword,
  });

  if (!user) {
    return res.status(200).json({
      success: false,
      status: "Error",
      message: "Something went wrong while registering user",
    });
  }

  return res
    .status(201)
    .json({ success: true, status: "Success", message: "User Registered Successfully" });
};


//logout

const logout = (req, res) => {
  res.clearCookie("token").json({
    status: "Success",
    success: true,
    message: "Logged out successfully!",
  });
};


//auth middleware
const authMiddleware = async (req, res, next) => {
  let token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      message: "Invalid token",
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Error verifying token",
      success: false,
      message: "Unauthorised user!",
    });
  }
};
export { login, register, logout, authMiddleware };
