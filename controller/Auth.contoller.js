import mongoose from "mongoose";
import AuthModel from "../model/AuthModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config(); 

const JWT_SECRET = process.env.PORT;

export const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await AuthModel.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(401).json({ message: 'Invalid credentials' });
}

    

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1d' } // token valid for 1 hour
    );

    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const signup = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    // Check if user already exists
    const existingUser = await AuthModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create and save new user
    const newUser = new AuthModel({ name, username, password });
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ message: 'Signup successful',newUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const signout = async (req, res) => {
  try {
    // If using cookie:
    // res.clearCookie('token'); // optional

    res.status(200).json({ message: 'Successfully signed out' });
  } catch (err) {
    res.status(500).json({ error: 'Error signing out' });
  }
};

