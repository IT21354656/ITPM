const Workspace = require("../models/workspaceModel");

//Create Workspaces
const createWorkspace = async (req, res) => {
  try {
    const { name, user } = req.body;

    //check title, description, xpLevel, language is empty
    if (!name) {
      return res.status(400).json({
        message: "name field must be filled",
      });
    }

    //check if Workspace already exists
    const existingWorkspace = await Workspace.findOne({ name });
    if (existingWorkspace) {
      return res.status(409).json({ message: "Workspace already exists" });
    }

    //create new Workspace
    const newWorkspace = new Workspace({
      name, user
    });
    await newWorkspace.save();

    res.status(200).json({
      name, user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Workspaces
const getAllWorkspaces = async (req, res) => {
  const userId = req.params.userId;
  try {
    const Workspaces = await Workspace.find({ user: userId });
    if (!Workspaces) {
      return res.status(404).json({ message: "Workspaces not found" });
    } else {
      res.status(200).json(Workspaces);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get Workspace by ID
const getWorkspaceById = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    } else {
      res.status(200).json(workspace);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Update a Workspace
const updateWorkspace = async (req, res) => {
  try {
    const { name } = req.body;

    //check if Workspace already exists
    const existingWorkspace = await Workspace.findOne({ name });
    if (existingWorkspace) {
      return res.status(409).json({ message: "Workspace already exists" });
    }

    //find Workspace by ID
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    //update Workspace
    workspace.name = name || Workspace.name;

    await workspace.save();

    //send success message
    res.json({ message: "Workspace updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Delete a Workspace
const deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    } else {
      await workspace.deleteOne();
      res.status(200).json({ message: "Workspace deleted successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createWorkspace,
  getAllWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
};
