import React, { useEffect, useState } from "react";
import Axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Spinner } from "@material-tailwind/react";
import Axioss from "@/api/Axioss";

// modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function lessonPage() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [xpLevel, setXpLevel] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [lessonOrder, setLessonOrder] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [videoList, setVideoList] = React.useState("");
  const [articleList, setArticleList] = React.useState("");
  const [quizList, setQuizList] = React.useState("");
  const [creatorId, setCreatorId] = React.useState("");

  let [uTitle, setUTitle] = React.useState("");
  let [uDescription, setUDescription] = React.useState("");
  let [uXpLevel, setUXpLevel] = React.useState("");
  let [uLanguage, setULanguage] = React.useState("");
  let [uLessonOrder, setULessonOrder] = React.useState("");
  let [uCategory, setUCategory] = React.useState("");
  let [uVideoList, setUVideoList] = React.useState("");
  let [uArticleList, setUArticleList] = React.useState("");
  let [uQuizList, setUQuizList] = React.useState("");

  const [lessons, setLessons] = useState(null);
  const [formattedLessons, setFormattedLessons] = React.useState(null);
  const [currentDeleteId, setCurrentDeleteId] = React.useState("");
  const [currentUpdateId, setCurrentUpdateId] = React.useState("");
  const [currentUpdateObject, setCurrentUpdateObject] = React.useState("");

  const [titleError, setTitleError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [xpLevelError, setXpLevelError] = React.useState("");
  const [languageError, setLanguageError] = React.useState("");
  const [lessonOrderError, setLessonOrderError] = React.useState("");
  const [categoryError, setCategoryError] = React.useState("");
  const [userData, setUserData] = useState({ user: {} });
  // uTitle = currentUpdateObject[0].title;
  // uDescription = currentUpdateObject[0].description;
  // uXpLevel = currentUpdateObject[0].xpLevel;
  // uLanguage = currentUpdateObject[0].language;
  // uLessonOrder = currentUpdateObject[0].lessonOrder;
  // uCategory = currentUpdateObject[0].category;
  // uVideoList = currentUpdateObject[0].videoList;
  // uArticleList = currentUpdateObject[0].articleList;
  // uQuizList = currentUpdateObject[0].quizList;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //created success modal
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const handleSuccessModalOpen = () => {
    setOpenSuccessModal(true);
  };
  const handleSuccessModalClose = () => {
    setOpenSuccessModal(false);
  };

  //Delete modal
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleDeleteModalOpen = () => {
    setOpenDeleteModal(true);
  };
  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
  };

  //handle Update Confirm Modal Close
  const [openUpdateConfirmModal, setOpenUpdateConfirmModal] =
    React.useState(false);
  const handleUpdateConfirmModalOpen = () => {
    setOpenUpdateConfirmModal(true);
  };
  const handleUpdateConfirmModalClose = () => {
    setOpenUpdateConfirmModal(false);
  };

  //Update form modal
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const handleUpdateModalOpen = (id) => {
    setCurrentUpdateObject(lessons.filter((item) => item._id === id));
    setOpenUpdateModal(true);
  };
  const handleUpdateModalClose = () => {
    setOpenUpdateModal(false);
  };

  //Update Success modal
  const [openUpdateSuccessModal, setOpenUpdateSuccessModal] =
    React.useState(false);
  const handleUpdateSuccessModalOpen = () => {
    setOpenUpdateSuccessModal(true);
  };
  const handleUpdateSuccessModalClose = () => {
    setOpenUpdateSuccessModal(false);
  };

  //fetch all lessons
  const fetchLessons = async () => {};

  useEffect(() => {
    Axioss.get("api/user/getUserProfile")
      .then(async (res) => {
        console.log(
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          res.data.user._id
        );
        const response = await Axioss.get(
          `http://localhost:7000/api/lesson/creator/${res.data.user._id}`
        );

        setLessons(response.data);

        // Transform the response data into the desired format
        const lessonsFormatted = response.data.map((lesson) => ({
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          category: lesson.category,
          xpLevel: lesson.xpLevel,
          language: lesson.language,
        }));
        setFormattedLessons(lessonsFormatted);
        console.log(response.data); // Access the response data here
        setUserData(res.data);
      })
      .catch((error) => {
        console.error(error); // Handle any errors here
      });
  }, []);

  console.log("Lessons:", lessons);
  console.log("Formatted Lessons:", formattedLessons);

  //table columns
  const columns = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "category", headerName: "Category", width: 200 },
    { field: "xpLevel", headerName: "Experience Level", width: 200 },
    { field: "language", headerName: "Language", width: 150 },
    {
      field: "editButton",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => (
        <EditIcon
          onClick={() => {
            console.log("Current Update ID:", params.row.id);
            setCurrentUpdateId(params.row.id);
            handleUpdateModalOpen(params.row.id);
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
    {
      field: "deleteButton",
      headerName: "Delete",
      width: 70,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => {
            setCurrentDeleteId(params.row.id);
            handleDeleteModalOpen();
          }}
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  console.log("Current Update set ID:", currentUpdateId);

  //submit the selected values
  const handleSubmitCreateLesson = async () => {
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Experience Level:", xpLevel);
    console.log("Language:", language);
    console.log("Category:", category);
    console.log("Lesson Order:", lessonOrder);
    console.log("Video Links:", videoList);
    console.log("Article Links:", articleList);
    console.log("Quiz Links:", quizList);

    const videoArray = videoList.split(",").map((value) => value.trim());
    const articleArray = articleList.split(",").map((value) => value.trim());
    const quizArray = quizList.split(",").map((value) => value.trim());

    if (title.length < 3) {
      setTitleError("Title must be at least 3 characters long.");
      return;
    }

    if (description.length < 10) {
      setDescriptionError("Description must be at least 10 characters long.");
      return;
    }

    if (isNaN(lessonOrder) || lessonOrder < 1) {
      setLessonOrderError("Please enter a valid number");
    }

    if (!xpLevel) {
      setXpLevelError("Please select an experience level.");
      alert("Please select an experience level.");
      return;
    }

    Axios.post("http://localhost:7000/api/lesson/", {
      title: title,
      description: description,
      xpLevel: xpLevel,
      language: language,
      category: category,
      lessonOrder: lessonOrder,
      videoList: videoArray,
      articleList: articleArray,
      quizList: quizArray,
      creatorId: userData.user._id,
    });

    // if (title.length < 3) {
    //   setTitleError("Title must be at least 3 characters long.");
    //   return;
    // }

    // if (description.length < 10) {
    //   setDescriptionError("Description must be at least 10 characters long.");
    //   return;
    // }

    // if (isNaN(lessonOrder) || lessonOrder < 1) {
    //   setLessonOrderError("Please enter a valid number");
    // }

    // if (!xpLevel) {
    //   setXpLevelError("Please select an experience level.");
    //   alert("Please select an experience level.");
    //   return;
    // }

    if (true) {
      handleClose();
      handleSuccessModalOpen();
    }
  };

  //Delete a lesson
  const handleDelete = async () => {
    await Axios.delete(`http://localhost:7000/api/lesson/${currentDeleteId}`);
    console.log("Deleted ID:", currentDeleteId);
    handleDeleteModalClose();
    fetchLessons();
  };

  //Update a lesson
  const handleUpdate = async () => {
    // console.log("Title:", title);
    // console.log("Description:", description);
    // console.log("Experience Level:", xpLevel);
    // console.log("Language:", language);
    // console.log("Lesson Order:", lessonOrder);
    // console.log("Video Links:", videoList);
    // console.log("Article Links:", articleList);
    // console.log("Quiz Links:", quizList);

    const videoArray = videoList.split(",").map((value) => value.trim());
    const articleArray = articleList.split(",").map((value) => value.trim());
    const quizArray = quizList.split(",").map((value) => value.trim());

    if (!title) {
      setTitle(currentUpdateObject[0].title);
    }

    if (!description) {
      setDescription(currentUpdateObject[0].description);
    }

    if (!lessonOrder) {
      setLessonOrder(currentUpdateObject[0].lessonOrder);
    }

    if (!xpLevel) {
      setXpLevel(currentUpdateObject[0].xpLevel);
    }

    if (!language) {
      setLanguage(currentUpdateObject[0].language);
    }

    if (!category) {
      setCategory(currentUpdateObject[0].category);
    }

    if (videoList.length < 0) {
      setVideoList(currentUpdateObject[0].videoList);
    }

    if (videoList.length < 0) {
      setArticleList(currentUpdateObject[0].articleList);
    }

    if (videoList.length < 0) {
      setQuizList(currentUpdateObject[0].quizList);
    }

    Axios.patch(`http://localhost:7000/api/lesson/${currentUpdateId}`, {
      title: title,
      description: description,
      xpLevel: xpLevel,
      language: language,
      lessonOrder: lessonOrder,
      videoList: videoArray,
      articleList: articleArray,
      quizList: quizArray,
    });

    if (true) {
      handleUpdateModalClose();
      handleUpdateConfirmModalClose();
      handleUpdateSuccessModalOpen();
    }
  };

  // console.log("Title", uTitle);
  // console.log("Description", uDescription);
  // console.log("Experience Level", uXpLevel);
  // console.log("Language", uLanguage);
  // console.log("Lesson Order", uLessonOrder);
  // console.log("Category", uCategory);
  //console.log("Video Links", currentUpdateObject[0].videoList);
  // console.log("Article Links", uArticleList);
  // console.log("Quiz Links", uQuizList);

  return (
    <div className=" pb-40">
      <section className="section py-14" id="home">
        {/* intro container */}
        <div className="container">
          <h1 className="text-3xl font-semibold leading-[70px] tracking-wide text-black mb-10">
            Lessons
          </h1>
        </div>

        {/* lesson view table */}
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-3/3 mx-2"></div>
            {formattedLessons ? (
              <>
                <DataGrid
                  rows={formattedLessons}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </>
            ) : (
              <Spinner className="h-8 w-8" />
            )}
          </div>
        </div>

        <div className="container mt-14">
          <div className="lg:flex justify-center">
            {/* Create lesson button */}
            <Button
              className="mt-3 bg-black w-max h-12 text-white py-1 px-8 rounded-md center"
              fullWidth
              onClick={handleOpen}
            >
              Create a Lesson
            </Button>

            {/* Update lesson form */}
            {currentUpdateObject ? (
              <>
                <Modal
                  open={openUpdateModal}
                  onClose={handleUpdateModalClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box sx={{ ...style, width: 420, height: 650 }}>
                    <div className="h-full overflow-y-auto">
                      <h2
                        className="text-3xl font-semibold leading-[70px] tracking-wide text-transparent bg-clip-text bg-black"
                        id="parent-modal-title"
                      >
                        Update a lesson
                      </h2>
                      <p id="parent-modal-description">
                        Fill out the form to update the lesson.
                      </p>
                      <form className="mt-2 mb-2 max-w-screen-lg sm:w-150">
                        <TextField
                          defaultValue={currentUpdateObject[0].title}
                          label="Title"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value.length < 3) {
                              setTitleError(
                                "Title must be at least 3 characters long."
                              );
                            } else {
                              setTitleError("");
                            }
                            setTitle(value);
                          }}
                          error={!!titleError}
                          helperText={titleError}
                        />

                        <TextField
                          defaultValue={currentUpdateObject[0].description}
                          label="Description"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value.length < 10) {
                              setDescriptionError(
                                "Description must be at least 10 characters long."
                              );
                            } else {
                              setDescriptionError("");
                            }
                            setDescription(value);
                          }}
                          error={!!descriptionError}
                          helperText={descriptionError}
                        />

                        <TextField
                          defaultValue={currentUpdateObject[0].lessonOrder}
                          label="LessonOrder"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(event) => {
                            const value = event.target.value;
                            if (isNaN(value) || value < 1) {
                              setLessonOrderError(
                                "Please enter a valid number"
                              );
                            } else {
                              setLessonOrderError("");
                            }
                            setLessonOrder(value);
                          }}
                          error={!!lessonOrderError}
                          helperText={lessonOrderError}
                        />

                        <FormControl
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        >
                          <InputLabel id="experience-level-label">
                            Experience Level
                          </InputLabel>
                          <Select
                            defaultValue={currentUpdateObject[0].xpLevel}
                            labelId="experience-level-label"
                            id="experience-level"
                            label="Experience Level"
                            onChange={(event) => {
                              const value = event.target.value;
                              if (!value) {
                                setXpLevelError(
                                  "Please select an experience level."
                                );
                              } else {
                                setXpLevelError("");
                              }
                              setXpLevel(value);
                            }}
                            error={!!xpLevelError}
                            helperText={xpLevelError}
                          >
                            <MenuItem value="Beginner">Beginner</MenuItem>
                            <MenuItem value="Intermediate">
                              Intermediate
                            </MenuItem>
                            <MenuItem value="Advanced">Advanced</MenuItem>
                          </Select>
                        </FormControl>

                        <FormControl
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        >
                          <InputLabel id="language-label">Language</InputLabel>
                          <Select
                            defaultValue={currentUpdateObject[0].language}
                            labelId="language-label"
                            id="language"
                            label="Language"
                            onChange={(event) =>
                              setLanguage(event.target.value)
                            }
                          >
                            <MenuItem value="Java">Java</MenuItem>
                            <MenuItem value="PHP">PHP</MenuItem>
                          </Select>
                        </FormControl>

                        {/* {currentUpdateObject[0].language != "" && ( */}
                        <FormControl
                          fullWidth
                          margin="normal"
                          variant="outlined"
                        >
                          <InputLabel id="category-label">Category</InputLabel>

                          {language === "Java" ? (
                            <Select
                              defaultValue={currentUpdateObject[0].category}
                              labelId="category-label"
                              id="category"
                              label="Category"
                              onChange={(event) =>
                                setCategory(event.target.value)
                              }
                            >
                              <MenuItem value="Fundamentals">
                                Fundamentals
                              </MenuItem>
                              <MenuItem value="Web Frameworks">
                                Web Frameworks
                              </MenuItem>
                              <MenuItem value="JDBC">JDBC</MenuItem>
                            </Select>
                          ) : (
                            <Select
                              defaultValue={currentUpdateObject[0].category}
                              labelId="category-label"
                              id="category"
                              //value={category}
                              label="Category"
                              onChange={(event) =>
                                setCategory(event.target.value)
                              }
                            >
                              <MenuItem value="PHP Basics">PHP Basics</MenuItem>
                              <MenuItem value="Frameworks">Frameworks</MenuItem>
                              <MenuItem value="Profilling">Profilling</MenuItem>
                            </Select>
                          )}
                        </FormControl>
                        {/* )} */}

                        <p id="parent-modal-description">
                          Add comma seperated values for the following fields.
                        </p>
                        <TextField
                          defaultValue={currentUpdateObject[0].videoList}
                          label="Video Links"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(event) => setVideoList(event.target.value)}
                        />

                        <TextField
                          defaultValue={currentUpdateObject[0].articleList}
                          label="Article Links"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(event) =>
                            setArticleList(event.target.value)
                          }
                        />

                        <TextField
                          defaultValue={currentUpdateObject[0].quizList}
                          label="Quiz Links"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={(event) => setQuizList(event.target.value)}
                        />

                        <div className="flex justify-between">
                          <Button
                            className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                            onClick={handleUpdateModalClose}
                          >
                            Close
                          </Button>
                          <Button
                            className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                            onClick={handleUpdateConfirmModalOpen}
                          >
                            Update
                          </Button>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>
              </>
            ) : (
              <></>
            )}

            {/* Update confirm modal */}
            <Modal
              open={openUpdateConfirmModal}
              onClose={handleUpdateConfirmModalClose}
            >
              <Box sx={{ ...style, width: 400 }}>
                <h2
                  className="text-3xl font-semibold text-black"
                  id="parent-modal-title"
                >
                  Are you sure want to update this lesson?
                </h2>
                <br />

                <div className="flex justify-between">
                  <Button
                    className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                    onClick={handleUpdateConfirmModalClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </div>
              </Box>
            </Modal>

            {/* Delete confirm modal */}
            <Modal open={openDeleteModal} onClose={handleDeleteModalClose}>
              <Box sx={{ ...style, width: 400 }}>
                <h2
                  className="text-3xl font-semibold text-black"
                  id="parent-modal-title"
                >
                  Are you sure want to delete this lesson?
                </h2>
                <br />

                <div className="flex justify-between">
                  <Button
                    className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                    onClick={handleDeleteModalClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </Box>
            </Modal>

            {/* Create Success modal */}
            <Modal open={openSuccessModal} onClose={handleSuccessModalClose}>
              <Box sx={{ ...style, width: 400 }}>
                <h2
                  className="text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 text-center"
                  id="parent-modal-title"
                >
                  Lesson Successfully Created!
                </h2>
                <br />

                <div className="flex justify-center items-center">
                  <Button
                    className="mt-3 hover:bg-green-800 bg-green-700 w-max h-11 text-white py-1 px-8 rounded-md"
                    onClick={handleSuccessModalClose}
                  >
                    Okay
                  </Button>
                </div>
              </Box>
            </Modal>

            {/* Update Success modal */}
            <Modal
              open={openUpdateSuccessModal}
              onClose={handleUpdateSuccessModalClose}
            >
              <Box sx={{ ...style, width: 400 }}>
                <h2
                  className="text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 text-center"
                  id="parent-modal-title"
                >
                  Lesson Updated Successfully!
                </h2>
                <br />

                <div className="flex justify-center items-center">
                  <Button
                    className="mt-3 hover:bg-green-800 bg-green-700 w-max h-11 text-white py-1 px-8 rounded-md"
                    onClick={handleUpdateSuccessModalClose}
                  >
                    Okay
                  </Button>
                </div>
              </Box>
            </Modal>

            {/* create lesson form */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 420, height: 650 }}>
                <div className="h-full overflow-y-auto">
                  <h2
                    className="text-3xl font-semibold leading-[70px] tracking-wide text-transparent bg-clip-text bg-black"
                    id="parent-modal-title"
                  >
                    Create a new lesson
                  </h2>
                  <p id="parent-modal-description">
                    Fill out the form to create a new lesson.
                  </p>
                  <form className="mt-2 mb-2 max-w-screen-lg sm:w-150">
                    <TextField
                      label="Title"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value.length < 3) {
                          setTitleError(
                            "Title must be at least 3 characters long."
                          );
                        } else {
                          setTitleError("");
                        }
                        setTitle(value);
                      }}
                      error={!!titleError}
                      helperText={titleError}
                    />

                    <TextField
                      label="Description"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={(event) => {
                        const value = event.target.value;
                        if (value.length < 10) {
                          setDescriptionError(
                            "Title must be at least 10 characters long."
                          );
                        } else {
                          setDescriptionError("");
                        }
                        setDescription(value);
                      }}
                      error={!!descriptionError}
                      helperText={descriptionError}
                    />

                    <TextField
                      type="Number"
                      label="LessonOrder"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={(event) => {
                        const value = event.target.value;
                        if (isNaN(value) || value < 1) {
                          setLessonOrderError("Please enter a valid number");
                        } else {
                          setLessonOrderError("");
                        }
                        setLessonOrder(value);
                      }}
                      error={!!lessonOrderError}
                      helperText={lessonOrderError}
                    />

                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel id="experience-level-label">
                        Experience Level
                      </InputLabel>
                      <Select
                        labelId="experience-level-label"
                        id="experience-level"
                        value={xpLevel}
                        label="Experience Level"
                        onChange={(event) => {
                          const value = event.target.value;
                          if (!value) {
                            setXpLevelError(
                              "Please select an experience level."
                            );
                          } else {
                            setXpLevelError("");
                          }
                          setXpLevel(value);
                        }}
                        error={!!xpLevelError}
                        helperText={xpLevelError}
                      >
                        <MenuItem value="Beginner">Beginner</MenuItem>
                        <MenuItem value="Intermediate">Intermediate</MenuItem>
                        <MenuItem value="Advanced">Advanced</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel id="language-label">Language</InputLabel>
                      <Select
                        labelId="language-label"
                        id="language"
                        value={language}
                        label="Language"
                        onChange={(event) => setLanguage(event.target.value)}
                      >
                        <MenuItem value="Java">Java</MenuItem>
                        <MenuItem value="PHP">PHP</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal" variant="outlined">
                      <InputLabel id="category-label">Category</InputLabel>

                      {language === "Java" ? (
                        <Select
                          labelId="category-label"
                          id="category"
                          value={category}
                          label="Category"
                          onChange={(event) => setCategory(event.target.value)}
                        >
                          <MenuItem value="Fundamentals">Fundamentals</MenuItem>
                          <MenuItem value="Web Frameworks">
                            Web Frameworks
                          </MenuItem>
                          <MenuItem value="JDBC">JDBC</MenuItem>
                        </Select>
                      ) : (
                        <Select
                          labelId="category-label"
                          id="category"
                          value={category}
                          label="Category"
                          onChange={(event) => setCategory(event.target.value)}
                        >
                          <MenuItem value="PHP Basics">PHP Basics</MenuItem>
                          <MenuItem value="Frameworks">Frameworks</MenuItem>
                          <MenuItem value="Profilling">Profilling</MenuItem>
                        </Select>
                      )}
                    </FormControl>

                    <p id="parent-modal-description">
                      Add comma seperated values for the following fields.
                    </p>
                    <TextField
                      label="Video Links"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={(event) => setVideoList(event.target.value)}
                    />

                    <TextField
                      label="Article Links"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={(event) => setArticleList(event.target.value)}
                    />

                    <TextField
                      label="Quiz Links"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      onChange={(event) => setQuizList(event.target.value)}
                    />

                    <div className="flex justify-between">
                      <Button
                        className="mt-3 hover:bg-blue-800 bg-blue-700 w-max h-12 text-white py-1 px-8 rounded-md"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        className="mt-3 hover:bg-pink-700 bg-pink-600 w-max h-12 text-white py-1 px-8 rounded-md"
                        onClick={handleSubmitCreateLesson}
                      >
                        Create
                      </Button>
                    </div>
                  </form>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
}

export default lessonPage;
