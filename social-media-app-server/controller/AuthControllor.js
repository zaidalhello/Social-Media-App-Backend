import UserModel from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const registerUser = async (req, res) => {
  try {
    const { userName, password, firstName, lastName } = req.body;
    if (!userName || !password || !firstName || !lastName) {
      return res
        .status(40)
        .json({ message: "Register failed pleas cheack all requierd fields" });
    }
    const existingUser = await UserModel.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: `${userName} already exists` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const user = await newUser.save();
    const token = jwt.sign(
      {
        userName: user.userName,

        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Register successful" ,
    user: user._doc,
        token: token,

    });
  } catch (error) {
    res.status(400).json({ message: "Register failed" + error });
  }
};
export const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Please check all required fields" });
    }

    const existingUser = await UserModel.findOne({ userName });
    if (!existingUser) {
      return res.status(404).json({ message: `${userName} does not exist` });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          userName: existingUser.userName,

          id: existingUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      const { password, ...dataToSend } = existingUser;
      res.status(200).json({
        message: "Login successful",
        user: dataToSend._doc,
        token: token,
      });
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed, please try again later" });
  }
};
