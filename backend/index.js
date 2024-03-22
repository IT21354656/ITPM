require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const port = 7000;
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
//Import Routes
const lessonRoutes = require("./src/routes/lessonRoutes");
const workspaceRoutes = require("./src/routes/workspaceRoutes");

// const codeSnippetRoutes = require("./src/routes/codeSnippetRoutes");
const userRoutes = require("./src/routes/userRoutes");

const questionRoutes = require("./src/routes/questionRoutes");
const codeRoutes = require("./src/routes/codeRoutes");
const codeSnippetRoutes = require("./src/routes/codeSnippetRoutes");

//Use routes
app.use("/api/lesson", lessonRoutes);
app.use("/api/workspace", workspaceRoutes);

app.use("/api/codeSnippets", codeSnippetRoutes);
app.use("/api/user", userRoutes);
app.get("/remove-cookie", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });

  app.use("/api/code", codeRoutes);
  app.use("/api/question", questionRoutes);
  app.use("/api/codeSnippets", codeSnippetRoutes);

  res.sendStatus(200);
});
//Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://kisusi1306:kisusi1306@cluster0.iegpynw.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

module.exports = app;