import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import Modal from "react-modal";

function CodesComponent() {
  const [codes, setCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:7000/api/code/${router.query.workspaceId}`
        );
        setCodes(response.data);
      } catch (error) {
        console.error("Error fetching codes:", error);
      }
    };

    if (router.query.workspaceId) {
      fetchCodes();
    }
  }, [router.query.workspaceId]);

  const handleDelete = async () => {
    try {
      await Axios.delete(`http://localhost:7000/api/code/${selectedCode._id}`);
      setCodes(codes.filter((code) => code._id !== selectedCode._id));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting code:", error);
    }
  };

  const openModal = (code) => {
    setSelectedCode(code);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCode(null);
    setIsModalOpen(false);
  };

  return (
    <div style={{ minHeight: "25em" }}>
      <div className="text-center">
        <p className="font-bold text-xl mt-2 uppercase mb-10">
          Workspace - {router.query.workspacename}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-10">
        <Link
          href={{
            pathname: "/compiler",
            query: { codeId:"" , workspacename: router.query.workspacename, workspaceId: router.query.workspaceId },
          }}
        >
          <div>
            <div
              className="grid-item border p-4 bg-gray-500 text-gray-800 cursor-pointer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ marginBottom: "8px" }}>Write a new code</div>
              <GrAddCircle />
            </div>
          </div>
        </Link>
        {codes.map((code, index) => (
          <div
            className="grid-item border p-4 bg-gray-200 text-gray-800 cursor-pointer"
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Link
              href={{
                pathname: "/compiler",
                query: { codeId: code._id, code: code.code, language: code.language, workspaceId: router.query.workspaceId},
              }}
            >
              <div style={{ marginBottom: "8px" }}>{code.name}</div>
            </Link>
            <MdOutlineDeleteForever onClick={() => openModal(code)} />
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Code Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "300px",
            width: "100%",
          },
        }}
      >
        <h2 className="text-center mb-4">Confirm Deletion</h2>
        <div className="flex justify-center mb-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={handleDelete}
          >
            Yes
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CodesComponent;
