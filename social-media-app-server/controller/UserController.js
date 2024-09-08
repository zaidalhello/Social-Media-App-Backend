import UserModel from "../Models/UserModel.js";
import mongoose from "mongoose";

export const getUser = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      return res.status(200).json({ message: "User found", otherDetails });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    // Fetch all users from the database
    const users = await UserModel.find();

    if (users) {
      // Filter out the user with the specified ID
      const filteredUsers = users.filter((user) => user._id.toString() !== id);

      // Remove the password field from each user
      const usersWithoutPassword = filteredUsers.map(
        ({ password, ...user }) => user._doc
      );

      return res
        .status(200)
        .json({ message: "Users found", users: usersWithoutPassword });
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    // Updating user data
    const user = await UserModel.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });

    if (user) {
      const { password, ...otherDetails } = user._doc; // Use 'otherDetails' to be consistent
      return res
        .status(200)
        .json({ message: "Update successful", otherDetails });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  const { currentUserID, currentUserAdminStatus } = req.body;

  try {
    if (id === currentUserID || currentUserAdminStatus) {
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      await UserModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this user." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//follow User

export const followUser = async (req, res) => {
  const id = req.params.id;
  const currentUserID = req.params.currentUserID;

  if (id === currentUserID) {
    return res
      .status(403)
      .json({ message: "You are not allowed to follow this user." });
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserID);
      if (!followUser || !followingUser) {
        return res.status(404).json({ message: "User not found." });
      }

      if (!followUser.followers.includes(currentUserID)) {
        await followUser.updateOne({ $push: { followers: currentUserID } });

        await followingUser.updateOne({ $push: { following: id } });
        return res
          .status(200)
          .json({ message: "You have started following this user." });
      } else {
        await followUser.updateOne({ $pull: { followers: currentUserID } });

        await followingUser.updateOne({ $pull: { following: id } });
        return res
          .status(200)
          .json({ message: "You have unfollowed this user." });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
};
