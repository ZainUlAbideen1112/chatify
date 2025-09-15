import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export async function signUp(req, res) {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must contain atleast 6 characters" });
    }

    // check if emailis valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check For duplicate emails
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // hashing the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating newUser with hashed password
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Saving User to db
      generateToken(newUser._id, res);
      await newUser.save();

      // Sending res to client
      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        password: newUser.password,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid User data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function logIn(req, res) {
  res.send("LogIn");
}

export async function logOut(req, res) {
  res.send("LogOut");
}
