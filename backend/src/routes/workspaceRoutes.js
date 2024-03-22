const express = require("express");
const router = express.Router();

const {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaceController");

//Create a workspace
router.post("/", createWorkspace);

//Get all workspaces
router.get("/:userId", getAllWorkspaces);

//Get workspace by id
router.get("/:id", getWorkspaceById);

//Update a workspace
router.patch("/:id", updateWorkspace);

//Delete a workspace
router.delete("/:id", deleteWorkspace);

module.exports = router;
