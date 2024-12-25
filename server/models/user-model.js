import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
    userRole: {
      type: String,
      required: [true, "User role is required"],
    },
    userPassword: {
      type: String,
      required: [true, "User password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
