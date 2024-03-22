const express = require("express");

const router = express.Router();

const {
  loginUser,
  signupUser,
  addUserScore,
  getUserById,
  getUserRank,
  calculateAverageScores,
  getUserScoresList,
} = require("../controllers/userControler");
const { authenticateUserMiddleware } = require("../middleware/auth");

//login
router.post("/login", loginUser);

//signup
router.post("/signup", signupUser);

//add user score
router.post("/addUserScore", authenticateUserMiddleware, addUserScore);

//get user's details for user profile
router.get("/getUserProfile", authenticateUserMiddleware, getUserById);

//get user rank
router.get("/getUserRank", getUserRank);

//calculate avaerage scores
router.get("/getAverages", calculateAverageScores);

//get scores list
router.get("/getScoresList", authenticateUserMiddleware, getUserScoresList);

module.exports = router;
