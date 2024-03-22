const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");

// Create JWT token
const createToken = (_id) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ _id }, "vufuifhf65465357fvgg76r6754uyfgu", {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

//sign up user

const signupUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password);

  try {
    if (!email || !password) {
      //throw Error("All fields must be filled")
      console.log(firstName, lastName, email, password);
    }

    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }

    /*if(!validator.isStrongPassword(password)){
      throw Error('Password is not strong enough')
  }*/

    const exists = await UserModel.findOne({ email });
    //console.log(firstName, lastName, email, password)
    if (exists) {
      throw Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    console.log("Fff");
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All the fields must be filled");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw Error("Incorrect email");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password");
    }

    //create token
    const token = createToken(user._id);

    console.log(token);

    res.cookie("jwt", token, { httpOnly: true });
    res.status(200).json({ email, token });
  } catch (error) {
    console.log("Fff");
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//add user score
const addUserScore = async (req, res) => {
  const { user, score } = req.body;

  try {
    const userId = await UserModel.findById(user);

    if (!userId) {
      return res.status(404).json({ message: "User not found " });
    }

    userId.codeScore.push(score);

    await userId.save();

    res.status(200).json({ message: "Score saved successfully" });
  } catch (error) {
    console.error("Error saving score:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get user's info
const getUserById = async (req, res) => {
  console.log("mekat awaa");
  const { user } = req.body;

  try {
    // Find the user by their ID
    const userId = await UserModel.findById(user._id);

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get the rank of a specific user
const getUserRank = async (req, res) => {
  try {
    const { userId } = req.body;

    // Calculate the average score for the specific user
    const user = await UserModel.findById(userId, "codeScore");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const average =
      user.codeScore.reduce((total, score) => total + score, 0) /
      user.codeScore.length;

    // Find the rank of the user based on the average score
    const users = await UserModel.find({}, "codeScore");
    const userAverages = users.map((user) => ({
      _id: user._id,
      average:
        user.codeScore.reduce((total, score) => total + score, 0) /
        user.codeScore.length,
    }));
    userAverages.sort((a, b) => b.average - a.average);
    const rank = userAverages.findIndex((item) => item._id.equals(userId)) + 1;

    res.status(200).json({ average, rank });
  } catch (error) {
    console.error("Error getting user rank:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Calculate the average score for each user
const calculateAverageScores = async (req, res) => {
  try {
    // Fetch all users and their code scores
    const users = await UserModel.find({}, "codeScore");

    // Calculate the average score for each user
    const userAverages = users.map((user) => {
      const average =
        user.codeScore.reduce((total, score) => total + score, 0) /
        user.codeScore.length;
      return { _id: user._id, average };
    });

    // Sort users by average score in descending order
    userAverages.sort((a, b) => b.average - a.average);

    res.status(200).json(userAverages);
  } catch (error) {
    console.error("Error calculating averages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get the count and list of scores for a specific user
const getUserScoresList = async (req, res) => {
  try {
    const { user } = req.body;

    // Find the user by their ID
    const userr = await UserModel.findById(user, "codeScore");
    if (!userr) {
      return res.status(404).json({ message: "User not found" });
    }

    const scoreCount = user.codeScore.length;
    const scoreList = user.codeScore;

    res.status(200).json({ scoreCount, scoreList });
  } catch (error) {
    console.error("Error getting user scores:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  loginUser,
  signupUser,
  addUserScore,
  getUserById,
  getUserRank,
  calculateAverageScores,
  getUserScoresList,
};
