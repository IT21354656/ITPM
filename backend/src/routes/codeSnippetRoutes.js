const express = require("express");
const router = express.Router();

const {

    addCodes,
    insertCode,
    getAllCodeSnippets,
    getCodeSnippetByTag,
    insertCodeSnippet
} = require("../controllers/codeSnippetsController")


//Add code snippets

router.post("/", addCodes);


router.post("/insertCode", insertCode)

router.post("/insertCodeSnippet", insertCodeSnippet)

router.get("/", getAllCodeSnippets)

router.get("/search", getCodeSnippetByTag)

module.exports = router;

