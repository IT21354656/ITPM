const express = require("express");
const router = express.Router();

const {
  createCode,
  getAllCodes,
  getCodesByWorkspaceName,
  getCodeById,
  updateCode,
  deleteCode,
} = require("../controllers/codeController");

//Create a code
router.post("/", createCode);

//Get all codes
router.get("/:workspaceId", getAllCodes);

//Get code by workspace name
router.get("/workspace/:workspaceName", getCodesByWorkspaceName);

//Get code by id
router.get("/:id", getCodeById);

//Update a code
router.patch("/update/:id", updateCode);

//Delete a code
router.delete("/:id", deleteCode);

module.exports = router;
