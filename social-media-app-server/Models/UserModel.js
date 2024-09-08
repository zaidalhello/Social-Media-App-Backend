import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    profilePicture: { type: String, default: "" },
    coverPicture: { type: String, default: "" },
    about: { type: String, default: "" },
    livesin: { type: String, default: "" },
    workat: { type: String, default: "" },
    relationShip: { type: String, default: "" },
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
