import React, { useState, useEffect } from "react";
import Axios from "axios";
import Link from "next/link";
import Modal from "react-modal";
import Axioss from "@/api/Axioss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginTop: "16px",
  },
};

function WorkspaceComponent() {
  const [workspaces, setWorkspaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");
  const [userData, setUserData] = useState({ user: {} });
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewWorkspaceName(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to add a new workspace
      await Axios.post("http://localhost:7000/api/workspace", {
        name: newWorkspaceName,
        user: userData.user._id,
      });

      // Fetch the updated list of workspaces
      fetchWorkspaces();

      // Close the modal
      closeModal();
    } catch (error) {
      console.error("Error adding workspace:", error);
    }
  };

  const fetchWorkspaces = async (userId) => {
    console.log(userId);
    const response = await Axios.get(
      `http://localhost:7000/api/workspace/${userId}`
    );
    setWorkspaces(response.data);
  };

  useEffect(() => {
    Axioss.get("api/user/getUserProfile")
      .then((response) => {
        fetchWorkspaces(response.data.user._id);
        console.log(response.data); // Access the response data here
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error); // Handle any errors here
      });
  }, []);

  // useEffect(() => {
  //   fetchWorkspaces("6515cc740fd1106243517f7a");
  // }, []);

  // import Axioss from "@/api/Axioss";

  // useEffect(() => {
  //   Axioss.get("api/user/getUserProfile")
  //     .then((response) => {
  //       console.log(response.data); // Access the response data here
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error); // Handle any errors here
  //     });
  // }, []);

  return (
    <div style={{ minHeight: "25em" }}>
      <div className="grid grid-cols-4 gap-10">
        <div
          className="grid-item border p-4 bg-gray-500 text-center text-gray-800 cursor-pointer"
          onClick={openModal}
        >
          Create New Workspace
        </div>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Workspace Modal"
          style={customStyles}
        >
          <h2>Add New Workspace</h2>
          <form onSubmit={handleFormSubmit} style={customStyles.form}>
            <div>
              <label htmlFor="newWorkspace">Workspace Name:</label>
              <input
                type="text"
                id="newWorkspace"
                value={newWorkspaceName}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <button type="submit" style={customStyles.submitButton}>
              Submit
            </button>
          </form>
        </Modal>
        {workspaces.map((workspace, index) => (
          <Link
            href={{
              pathname: "/workspace",
              query: {
                workspaceId: workspace._id,
                workspacename: workspace.name,
              }, // the data
            }}
          >
            <div
              class="grid-item border p-4 bg-gray-200 text-center text-gray-800 cursor-pointer"
              key={index}
            >
              {workspace.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default WorkspaceComponent;
