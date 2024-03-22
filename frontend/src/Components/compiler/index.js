import Axios from "axios";

////////////////////////////////Sahan/////////////////////////////////////////////

// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modals from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import FileCopyIcon from "@mui/icons-material/FileCopy"; // Import the copy icon
import CopyToClipboard from "react-copy-to-clipboard";
import LoadingButton from "@mui/lab/LoadingButton";
import Tab from "@mui/material/Tab";
import Image from "next/image";
import Box from "@mui/material/Box";
// const { PoweroffOutlined } = icons;
import { Button } from "antd";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { GrVmMaintenance } from "react-icons/gr";
import TabPanel from "@mui/lab/TabPanel";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

///////////////////////////////////////////////////////////////////////////////////
import React from "react";
import { useEffect, useState, useRef } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import Link from "next/link";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-xcode";

import "ace-builds/src-noconflict/theme-github";
import $ from "jquery";
import Grid from "@mui/material/Grid";
import { Grow } from "@mui/material";
import { Bubblegum_Sans } from "next/font/google";

import prettier from "prettier";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import Modal from "react-modal";
import { HiOutlineDocumentDuplicate } from "react-icons/hi2";
import { AiFillCaretRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import beautify from "js-beautify";

import Axioss from "@/api/Axioss";

export default function compiler() {
  const [selectedLanguage, setSelectedLanguage] = useState("php");
  const [output, setOutput] = useState("");
  const [editorTheme, setEditorTheme] = useState("xcode");
  const [isError, setIsError] = useState(false);
  const [currentError, setCurrentError] = useState("");
  const currentErrorRef = useRef("");
  const [correctedCode, setCorrectedCode] = useState("");
  const [hint, setHint] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEveluating, setIsEveluating] = useState(false);
  const [currentCode, setCurrentCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const recievedCode = useRef("");
  const [isSaved, setIsSaved] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const isExecutingRef = useRef(false);
  const [isDisplayCorrectedCode, setIsDisplayCorrectedCode] = useState(false);
  const [lastExecutedCode, setLastExecutedCode] = useState("");
  const [isCompiled, setIsCompiled] = useState(false);
  const [isDisplayPanel, setIsDisplayPanel] = useState(false);
  const [mark, setMark] = useState(0);
  const [good, setGood] = useState("");
  const [bad, setBad] = useState("");
  const [userData, setUserData] = useState({ user: {} });
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);

  useEffect(() => {
    const editor = ace.edit("editor");
    editor.setTheme(`ace/theme/${editorTheme}`);
    editor.session.setMode(`ace/mode/${selectedLanguage}`);
  }, [selectedLanguage, editorTheme]);
  var openai;
  const errorList = [
    "AssertionError",
    "AttributeError",
    "EOFError",
    "FloatingPointError",
    "GeneratorExit",
    "ImportError",
    "IndexError",
    "KeyError",
    "KeyboardInterrupt",
    "MemoryError",
    "NameError",
    "NotImplementedError",
    "OSError",
    "OverflowError",
    "ReferenceError",
    "RuntimeError",
    "StopIteration",
    "SyntaxError",
    "IndentationError",
    "TabError",
    "SystemError",
    "SystemExit",
    "TypeError",
    "UnboundLocalError",
    "UnicodeError",
    "UnicodeEncodeError",
    "UnicodeDecodeError",
    "UnicodeTranslateError",
    "ValueError",
    "ZeroDivisionError",
    "error",
    "warning",
    "Warning",
  ];
  const [size, setSize] = useState("small");
  const onChange = (e) => {
    setSize(e.target.value);
  };
  const editorRef = useRef(null);
  const router = useRouter();
  const data = router.query;

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (data.code) {
      setCurrentCode(data.code);
      recievedCode.current = data.code;
      setSelectedLanguage(data.language);
    }
  }, [data]);

  useEffect(() => {
    if (currentCode !== recievedCode.current) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }
  }, [currentCode]);

  useEffect(() => {
    if (currentCode == lastExecutedCode && isCompiled) {
      setIsDisplayPanel(true);
    } else {
      setIsDisplayPanel(false);
    }
  }, [currentCode]);
  console.log(currentCode);

  console.log("data", data);
  function changeLanguage(event) {
    const language = event.target.value;
    setSelectedLanguage(language);

    // Define a mapping of languages to themes here
    const languageThemes = {
      php: "solarized_dark",
      java: "eclipse", // Change to the desired theme for Java
    };

    // Set the editor theme based on the selected language
    setEditorTheme(languageThemes[language]);
  }
  console.log(typeof output);

  useEffect(() => {
    Axioss.get("api/user/getUserProfile")
      .then((response) => {
        console.log(response.data); // Access the response data here
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error); // Handle any errors here
      });
  }, []);

  async function executeCode() {
    currentErrorRef.current = "";
    setIsCompiled(true);

    setIsLoading(true);
    setIsExecuting(true);
    setIsDisplayCorrectedCode(false);
    setIsError(false);
    setHint("");
    handleChange(null, "1");
    setIsDisplayPanel(true);
    evaluateCode();
    console.log("KKKKKKKKKKKKKKK", isExecuting);
    console.log("selectinggggggggggggggggggg", selectedLanguage);
    setCurrentCode(ace.edit("editor").getSession().getValue());
    setLastExecutedCode(ace.edit("editor").getSession().getValue());
    console.log(
      "currentErroooooooooooooooooooooooooooooooooooo",
      currentErrorRef.current
    );
    console.log("currentCode", ace.edit("editor").getSession().getValue());
    await $.ajax({
      url: "http://localhost/RookieScriptCompiler/app/compiler.php",
      method: "POST",
      data: {
        language: selectedLanguage,
        code: ace.edit("editor").getSession().getValue(),
      },
      success: function (response) {
        console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR", response);

        for (const error of errorList) {
          if (response.includes(error)) {
            setIsError(true);
            const keywordIndex = response.indexOf(error);

            if (selectedLanguage == "java") {
              if (keywordIndex !== -1) {
                // Extract the substring from the keyword to the end of the message
                const extractedString = response.substring(keywordIndex);

                currentErrorRef.current = extractedString;
                console.log("Extracted String:", extractedString);
                requestCorrectCode();

                setOutput(extractedString);
              }
            } else {
              const endIndex = response.indexOf("in C");
              const extractedString = response.substring(0, endIndex);
              console.log("Extracted String:", extractedString);

              currentErrorRef.current = extractedString;
              requestCorrectCode();
              requestExplanation();
              setOutput(extractedString);
            }
          }
        }
        console.log(
          "currentErrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
          currentErrorRef.current
        );
        if (currentErrorRef.current == "") {
          console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
          setOutput(response);
        }
        setCorrectedCode("");
        // setIsLoading(false);
      },
    }).then(() => {
      if (currentErrorRef.current == "") {
        setIsLoading(false);
      }
    });

    console.log("MMMMMMMMMMMMMMMMM", isExecuting);
    setIsExecuting(false);
  }
  const snedOpenAI = async () => {
    // setIsLoading(true);
    openai = new OpenAI({
      //openAIApiKey: "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",
      openAIApiKey: "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",
      temperature: 0.8,
    });
    const template =
      "Imagin you are a IT teacher when I provided a  code with an error you should corrected that code  and and give me the corrected code as a json out put (object) json out put should contain 'correctedCode' , '$marks (out of 10 for the inncorect code)','explain (explain the error and way to fix it that can understand coding beginer)' inccoerct code :{code}   error :{error} language :{language}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["code", "error", "language"],
    });

    const chain = new LLMChain({ llm: openai, prompt });
    const result = await chain.call({
      code: ace.edit("editor").getSession().getValue(),
      error: currentErrorRef.current,
      language: selectedLanguage,
    });
    console.log(
      "ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
      result.text
    );
    const data = result.text;
    console.log(data.correctedCode);

    const startIndex = data.indexOf(":") + 3;

    // Find the index of "marks"
    var endIndex = data.indexOf("$", startIndex) - 2;
    console.log("endddddddddddddddd", endIndex);
    if (!endIndex) {
      endIndex = data.indexOf('"marks"', startIndex) - 2;
    }

    // Extract the data between "correctedCode: " and "marks"
    const extractedData = data.substring(startIndex, endIndex).trim();

    const correctedCode = extractedData.slice(0, -2);

    // const codeMatch = data.correctedCode.match(/\{([\s\S]*?)\}/);

    const stringWithoutNewlines = correctedCode.replace(/\\n/g, "");
    const stringWithoutTab = stringWithoutNewlines.replace(/\\t/g, "");
    var finalResault = stringWithoutTab.replace(/\\/g, "");

    const formattedCode = beautify(finalResault, {
      language: "java",
      indent_size: 2, // Set the desired tab width
    });
    setCorrectedCode(formattedCode);
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBB", finalResault);

    const start = data.indexOf("explain") + 10;
    const hint = data.substring(start).trim();
    setHint(hint.slice(0, -1));
    console.log("hint", hint);

    setIsLoading(false);
  };
  const requestCorrectCode = async () => {
    // setIsLoading(true);
    openai = new OpenAI({
      //openAIApiKey: "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",
      openAIApiKey: "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",
      temperature: 0.8,
    });
    const template =
      "Imagin you are a IT teacher when I provided a  code with an error you should corrected that code  and and give me the corrected code , don't provide any additional things I need only the code  \n this is ' inccoerct code :{code}   error :{error} language :{language}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["code", "error", "language"],
    });

    const chain = new LLMChain({ llm: openai, prompt });
    const result = await chain.call({
      code: ace.edit("editor").getSession().getValue(),
      error: currentErrorRef.current,
      language: selectedLanguage,
    });
    console.log(
      "YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
      result.text
    );
    const data = result.text;
    console.log(data.correctedCode);

    const formattedCode = beautify(result.text, {
      language: selectedLanguage,
      indent_size: 2, // Set the desired tab width
    });
    setCorrectedCode(formattedCode);
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBB", formattedCode);
    requestExplanation();
  };

  const requestExplanation = async () => {
    // setIsLoading(true);
    openai = new OpenAI({
      //openAIApiKey: "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",
      openAIApiKey: "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",
      temperature: 0.8,
    });
    const template =
      "Imagin you are a IT teacher when I provided a  code with an error you should explain why this code is wrong , don't provide corrected code , simplify and explain why that error happend that can understand coding beginer.  \n this is ' inccoerct code :{code}   error :{error} language :{language}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["code", "error", "language"],
    });

    const chain = new LLMChain({ llm: openai, prompt });
    const result = await chain.call({
      code: ace.edit("editor").getSession().getValue(),
      error: currentErrorRef.current,
      language: selectedLanguage,
    });
    console.log(
      "CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC",
      result.text
    );

    setHint(result.text);
    // const data = result.text;
    // console.log(data.correctedCode);

    // const formattedCode = beautify(result.text, {
    //   language: selectedLanguage,
    //   indent_size: 2, // Set the desired tab width
    // });
    // setCorrectedCode(formattedCode);
    // console.log("BBBBBBBBBBBBBBBBBBBBBBBBB", formattedCode);

    setIsLoading(false);
  };

  const evaluateCode = async () => {
    setIsEveluating(true);
    openai = new OpenAI({
      //openAIApiKey: "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",
      openAIApiKey: "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",
      temperature: 0.8,
    });
    const template =
      "Imagin you are a IT teacher when I provided a  code ,you should evaluate the provided code and give evaluate feedback as a json out put (object) json out put should contain  'marks (out of 10 for the inncorect code)','good (give a what's good thing that user done in the code )','bad (give a what's bad thing that user done in the code )' \n user's code :{code}  language :{language}";
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["code", "language"],
    });

    const chain = new LLMChain({ llm: openai, prompt });
    const result = await chain.call({
      code: ace.edit("editor").getSession().getValue(),
      language: selectedLanguage,
    });
    console.log(
      "eveluated codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      result.text,
      typeof result.text
    );
    try {
      const data = JSON.parse(result.text);
      console.log(
        "eveluated codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        data,
        typeof data
      );
      setMark(parseInt(data.marks) * 10);
      setGood(data.good);
      setBad(data.bad);
      Axioss.post("api/user/addUserScore", {
        score: parseInt(data.marks) * 10,
      });
    } catch (e) {
      console.log("retrying attempt");
      evaluateCode();
    }
    setIsEveluating(false);
  };
  const keyframesStyle = `
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

  const clearLogs = () => {
    setOutput("");
  };
  const loaderStyle = {
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #888888",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 2s linear infinite",
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    padding: "20px",
    maxWidth: "80%",
    // maxHeight: "80%",
    overflow: "auto",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    textAlign: "center",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#888",
  };

  const handleCopyClick = () => {
    if (editorRef.current) {
      // Get the text content from the AceEditor
      const editor = editorRef.current.editor;
      const codeToCopy = editor.getValue();

      // Create a textarea element to temporarily hold the text
      const textarea = document.createElement("textarea");
      textarea.value = codeToCopy;

      // Append the textarea to the document and select its text
      document.body.appendChild(textarea);
      textarea.select();

      // Copy the selected text to the clipboard
      document.execCommand("copy");

      // Remove the textarea from the document
      document.body.removeChild(textarea);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      // Optionally, you can provide user feedback (e.g., a tooltip) that the copy was successful
    }
  };

  const displayCorrectedCode = (e) => {
    setIsDisplayCorrectedCode(true);
    console.log("isDisplayCorrectedCode", isDisplayCorrectedCode);
  };

  /////////////////////////////////////sahan//////////////////////////////////////////
  //Modal sahan//////////////////
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/codeSnippets/search?keyword=${searchQuery}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Call handleSearch whenever searchQuery changes
    if (searchQuery !== "") {
      handleSearch();
    } else {
      // Clear searchResults if the search query is empty
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleCopy = () => {
    setCopied(true);
    // You can handle the copy action here if needed
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "80vh", // Set a maximum height for the modal
    overflow: "auto", // Enable scrolling when content exceeds the maximum height
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const cardStyle = {
    maxHeight: "200px", // Adjust the maximum height as needed
    overflow: "auto", // Enable scrolling when content exceeds the maximum height
    padding: "16px",
    position: "relative",
  };

  const copyIconStyle = {
    position: "absolute",
    top: "8px", // Adjust the top and right values for icon placement
    right: "8px",
    cursor: "pointer",
  };

  const codeStyle = {
    fontFamily: "monospace", // Use a monospace font
    whiteSpace: "pre", // Preserve whitespace
    tabSize: 4, // Set tab size (adjust as needed)
    lineHeight: "1.2", // Adjust line height as needed
    // Add any other CSS styles you prefer
  };

  // -------------------------- Udesh -----------------------------------
  const [codeId, setCodeId] = useState("");
  const [selectedWorkspace, setSelectedWorkspace] = useState(""); // State to hold the selected workspace
  const [codeName, setCodeName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeRediractModal = () => {
    setIsRedirectModalOpen(false);
  };

  useEffect(() => {
    setCodeId(router.query.codeId);
    setSelectedWorkspace(router.query.workspaceId);
    console.log("CodeId" + codeId);
    console.log("Workspace" + selectedWorkspace);
  }, []);

  const saveCode = () => {
    console.log(
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
      selectedWorkspace
    );
    if (selectedWorkspace === undefined) {
      setIsRedirectModalOpen(true);
    } else {
      if (codeId === "") {
        // If either workspace or code name is not selected, show a prompt
        openModal(); // If codeId is empty, open the modal
        // Axios.post("http://localhost:7000/api/code", {
        //   name: codeName,
        //   workspace: selectedWorkspace,
        //   code: currentCode,
        //   language: selectedLanguage,
        // })
        //   .then((response) => {
        //     console.log(response.data);
        //     setIsSaved(true);
        //     setCodeId(response.data.codeId);
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
      } else {
        Axios.patch(`http://localhost:7000/api/code/update/${codeId}`, {
          code: currentCode,
          language: selectedLanguage,
        })
          .then((response) => {
            // Handle the response if needed
            console.log(response.data);
            setIsSaved(true);
          })
          .catch((error) => {
            // Handle errors
            console.error("Error:", error);
          });
      }
    }
  };

  const handleModalSave = async (e) => {
    e.preventDefault();
    // Handle save action from the modal
    Axios.post("http://localhost:7000/api/code", {
      name: codeName, // Use the code name from the modal
      workspace: selectedWorkspace,
      code: currentCode,
      language: selectedLanguage,
    })
      .then((response) => {
        console.log(response.data);
        setIsSaved(true);
        setCodeId(response.data.codeId);
        setCodeName(""); // Reset the code name after saving
        closeModal(); // Close the modal after saving
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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

  return (
    <div>
      <Modal
        isOpen={false}
        // onRequestClose={closeModal}
        contentLabel="My Modal"
        style={{ content: modalStyle }}
        // shouldCloseOnOverlayClick={true}
      >
        <div className="flex flex-col justify-center items-center mt-20">
          <style>{keyframesStyle}</style>
          <div className="loader" style={loaderStyle}></div>
          <p className="text-black dark:text-white font-bold mt-4">
            We are almost there
          </p>
          <p className="text-gray-400">We&apos;re just preparing your code</p>
        </div>
      </Modal>{" "}
      <Grid container spacing={0}>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <button
            className="mt-4  text-white-800 py-1 px-8 self-center border border-gray-800 text-white"
            style={{
              backgroundColor: "green",
              marginBottom: "1em",
              marginLeft: "3em",
            }}
            onClick={handleOpen}
          >
            Code Generator
          </button>
        </Grid>

        <Grid
          item
          xs={7}
          style={{
            backgroundColor: "#2D2F34",
            height: "3em",
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={5.0}>
              <p className="mt-3 ml-4 text-white">workspace name</p>
            </Grid>
            <Grid item xs={2.0}>
              {!isSaved ? (
                <>
                  {" "}
                  <button
                    className="mt-4 bg-transparent text-white-800 py-1 px-6 self-center border border-white-800 text-white text-sm"
                    onClick={saveCode} // Attach the saveCode function to onClick event
                  >
                    Save code
                  </button>
                </>
              ) : (
                <p></p>
              )}
            </Grid>
            <Grid item xs={2}>
              <p className="mt-3 text-white">Select language </p>
            </Grid>
            <Grid item xs={2}>
              {" "}
              <select
                className="mt-3 px-8 py-1  rounded-lg border focus:ring focus:ring-blue-300 focus:outline-none bg-gray-700 text-white text-sm"
                id="languages"
                style={{ fontSize: "1px" }}
                value={selectedLanguage}
                onChange={changeLanguage}
              >
                <option value="php">php</option>
                <option value="java">Java</option>
                {/* Add more options for other languages as needed */}
              </select>{" "}
            </Grid>
            <Grid item xs={1} style={{ borderRight: "2px solid gray" }}>
              <Button
                type="primary"
                icon={
                  <AiFillCaretRight
                    style={{
                      color: "white",
                      fontSize: "15px",
                      marginLeft: "-2px",
                    }}
                  />
                }
                loading={isExecuting}
                onClick={executeCode}
                className="mt-3 bg-blue-800 text-white   self-center"
                style={{ width: "2em", height: "2em" }}
              />
              {/* <button
                className="mt-3 bg-blue-800 text-white py-1 px-2  self-center"
                style={{ borderRadius: "25px" }}
                onClick={executeCode}
              >
                <AiFillCaretRight />
              </button> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5} style={{ backgroundColor: "#2D2F34", height: "3em" }}>
          <Grid container spacing={0}>
            <Grid item xs={3}>
              <p className="ml-2 mt-3 text-white">Output</p>
            </Grid>{" "}
            <Grid item xs={3}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
              <button
                className="mt-3 bg-transparent text-white-800 py-1 px-6  self-center border border-white-800 text-white text-sm"
                onClick={clearLogs}
              >
                Clear
              </button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={7} style={{ borderRight: "2px solid gray" }}>
          {/* <AceEditor
            style={{ width: "100%", height: "calc(100vh - 200px)" }}
            mode={selectedLanguage}
            theme={editorTheme}
            name="editor"
            editorProps={{ $blockScrolling: true }}
          /> */}
          <AceEditor
            style={{
              width: "100%",
              height: "calc(120vh - 200px)",
              fontSize: "17px",
            }}
            mode={selectedLanguage}
            theme="chrome" // Use the light theme you imported
            name="editor"
            editorProps={{ $blockScrolling: true, fontSize: 22 }} // Adjust fontSize as needed
            value={currentCode}
            readOnly={false}
            showPrintMargin={false}
            onChange={(newCode) => {
              setCurrentCode(newCode);
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <AceEditor
                style={{
                  width: "100%",
                  height: "calc(75vh - 200px)",
                  fontSize: "15px",
                }}
                mode={selectedLanguage}
                theme={editorTheme}
                name="editor"
                editorProps={{ $blockScrolling: true }}
                value={output} // Set the value of the AceEditor to the code
                readOnly={true} // Allow editing
                showGutter={false} // Disable line numbers
                showPrintMargin={false} // Disable vertical lines
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                height: "calc(50vh - 200px)",
                backgroundColor: "white",
              }}
            >
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                      backgroundColor: "#e5e5e5",
                      height: "3em",
                    }}
                  >
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <Tab
                        label="clarification"
                        value="1"
                        sx={{
                          backgroundColor: "#e5e5e5", // Change tab background color
                          color: "gray", // Change font color to red
                          fontSize: "12px", // Change font size to 16px
                          "&.Mui-selected": {
                            color: "blue", // Change selected tab font color to blue
                          },
                        }}
                      />
                      <Tab
                        label="Feed back"
                        value="2"
                        sx={{
                          backgroundColor: "#e5e5e5", // Change tab background color
                          color: "gray", // Change font color to red
                          fontSize: "12px", // Change font size to 16px
                          "&.Mui-selected": {
                            color: "blue", // Change selected tab font color to blue
                          },
                        }}
                      />{" "}
                      {isError ? (
                        isDisplayCorrectedCode ? (
                          <Tab
                            label="corrected code"
                            value="3"
                            sx={{
                              backgroundColor: "#e5e5e5", // Change tab background color
                              color: "gray", // Change font color to red
                              fontSize: "12px", // Change font size to 16px
                              "&.Mui-selected": {
                                color: "blue", // Change selected tab font color to blue
                              },
                            }}
                          />
                        ) : (
                          <button
                            style={{
                              background: "#FFC300",
                              // marginLeft: "20em",
                              right: "0em",
                              left: "10em",
                              width: "2em",
                              height: "2em",
                              marginTop: "0.6em",
                              borderRadius: "50%",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingLeft: "0.5em",
                            }}
                            onClick={displayCorrectedCode}
                          >
                            <GrVmMaintenance />
                          </button>
                        )
                      ) : (
                        <></>
                      )}
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    {" "}
                    {isCompiled ? (
                      <>
                        {isLoading ? (
                          <div className="flex flex-col justify-center items-center mt-10">
                            <style>{keyframesStyle}</style>
                            <div className="loader" style={loaderStyle}></div>
                            <p className="text-black dark:text-white font-bold mt-4">
                              We are almost there
                            </p>
                            <p className="text-gray-400">
                              We&apos;re just analyzing your code
                            </p>
                          </div>
                        ) : (
                          <>
                            {" "}
                            <Grid container spacing={0}>
                              <Grid item xs={10}></Grid>
                              <Grid item xs={2}></Grid>
                            </Grid>
                            {hint ? (
                              <i>{hint}</i>
                            ) : (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Image
                                  src={
                                    "https://media.tenor.com/MMZ91nXAGU8AAAAC/ja.gif"
                                  }
                                  height={40}
                                  width={40}
                                  alt={`A cute animal!`}
                                  unoptimized={true}
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "10px",
                                  }}
                                />
                                <i> No error were found...</i>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {" "}
                        <i> Complie your code...</i>
                      </>
                    )}
                  </TabPanel>
                  <TabPanel value="2">
                    {" "}
                    {isCompiled ? (
                      isEveluating ? (
                        <div className="flex flex-col justify-center items-center mt-10">
                          <style>{keyframesStyle}</style>
                          <div className="loader" style={loaderStyle}></div>
                          <p className="text-black dark:text-white font-bold mt-4">
                            We are almost there
                          </p>
                          <p className="text-gray-400">
                            We&apos;re just analyzing your code
                          </p>
                        </div>
                      ) : (
                        <>
                          <Grid container spacing={0}>
                            <Grid item xs={3}>
                              {" "}
                              <CircularProgressbar
                                value={mark}
                                text={`${mark}%`}
                              />
                            </Grid>
                            <Grid item xs={9}>
                              <p
                                style={{ marginLeft: "1em", marginTop: "1em" }}
                              >
                                <b>What's Good :</b> <i>{good}</i>
                              </p>
                              <br></br>
                              <p style={{ marginLeft: "1em" }}>
                                <b>What's Bad :</b>
                                <i>{bad}</i>
                              </p>
                            </Grid>{" "}
                          </Grid>
                        </>
                      )
                    ) : (
                      <>
                        {" "}
                        <i> Complie your code...</i>
                      </>
                    )}
                  </TabPanel>
                  <TabPanel value="3">
                    <Grid container spacing={0}>
                      <Grid item xs={11}></Grid>
                      <Grid
                        item
                        xs={1}
                        style={{ marginTop: "-20px", marginBottom: "20px" }}
                      >
                        {" "}
                        {isCopied ? (
                          <p
                            className="mt-3 ml-4 text-black"
                            style={{ fontSize: "10px" }}
                          >
                            Copied!
                          </p>
                        ) : (
                          <>
                            {" "}
                            <button
                              className="mt-3 ml-4 "
                              onClick={handleCopyClick}
                              style={{ color: "black" }}
                            >
                              <HiOutlineDocumentDuplicate />
                            </button>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <AceEditor
                      ref={editorRef}
                      style={{
                        width: "100%",
                        height: "calc(100vh - 200px)",
                        fontSize: "18px",
                      }}
                      mode={selectedLanguage}
                      theme="chrome"
                      name="editor"
                      editorProps={{ $blockScrolling: true, fontSize: 56 }}
                      value={correctedCode} // Set the value of the AceEditor to the code
                      readOnly={true} // Allow editing
                      showGutter={false} // Disable line numbers
                      showPrintMargin={false} // Disable vertical lines
                    />
                  </TabPanel>
                </TabContext>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Link
        href={{
          pathname: "/test",
          query: { data: "hello" }, // the data
        }}
      >
        Some text
      </Link> */}
      {open && (
        <Modals
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              placeholder="Type what you want here..."
              fullWidth
              variant="outlined"
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: "gray" }} />,
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/*<button onClick={handleSearch}>Search</button>*/}

            {searchResults.map((result) => (
              <div key={result.id}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h2>{result.title}</h2>
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <p>{result.description}</p>
                </Typography>

                <Paper sx={cardStyle}>
                  <CopyToClipboard text={result.code} onCopy={handleCopy}>
                    <FileCopyIcon
                      sx={copyIconStyle}
                      color={copied ? "primary" : "action"}
                    />
                  </CopyToClipboard>

                  <pre style={codeStyle}>
                    <div>{result.code}</div>
                  </pre>
                </Paper>
              </div>
            ))}
          </Box>
        </Modals>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Code Name Modal"
        style={customStyles}
      >
        <h2>Enter Code Name</h2>
        <form onSubmit={handleModalSave} style={customStyles.form}>
          <div>
            <label htmlFor="codeName">Code Name:</label>
            <input
              type="text"
              id="codeName"
              value={codeName}
              onChange={(e) => setCodeName(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <button type="submit" style={customStyles.submitButton}>
            Save
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={isRedirectModalOpen}
        onRequestClose={closeRediractModal}
        contentLabel="Warning Modal"
        style={customStyles}
      >
        <h2>
          You need to sign in and create a workspace in order to save your codes{" "}
        </h2>
        <form onSubmit={closeRediractModal} style={customStyles.form}>
          <button type="submit" style={customStyles.submitButton}>
            Ok
          </button>
        </form>
      </Modal>
    </div>
  );
}
