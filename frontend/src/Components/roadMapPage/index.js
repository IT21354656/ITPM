import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
  Radio,
  Card,
  Button,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

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

function roadmapPage() {
  const [lessons, setLessons] = useState(null);
  const [xpLevel, setXpLevel] = useState("");
  // const [multiLang, setMultiLang] = useState("");
  const [category, setCategory] = useState("");
  const [preferredLang, setPreferredLang] = useState("");
  const [interLearning, setInterLearning] = useState("");

  const [filteredLessons, setFilteredLessons] = useState([]);

  const [openId, setOpenId] = useState("");
  const [currentOpenLesson, setCurrentOpenLesson] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = async (id) => {
    setCurrentOpenLesson(filteredLessons.filter((item) => item._id === id));
    setOpen(true);
    console.log("Current Open Lesson:", currentOpenLesson);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //fetch all lessons
  const fetchLessons = async () => {
    const response = await Axios.get("http://localhost:7000/api/lesson/");
    setLessons(response.data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  //submit the selected values

  const handleSubmitQuesForm = async () => {

    console.log("Selected Experience Level:", xpLevel);
    //console.log("Open to Learn Multiple Languages:", multiLang);
    console.log("Preferred Language:", preferredLang);
    console.log("Prefer Interactive Learning:", interLearning);
    console.log("Selected Category:", category);


    try {
      // Filter lessons
      let filtered = lessons.filter((lesson) => {
        const xpLevelMatch =
          lesson.xpLevel === xpLevel ||
          lesson.xpLevel === xpLevel.toLowerCase();

        //const multiLangMatch = multiLang.toLowerCase() === "yes";

        const preferredLangMatch =
          lesson.language === preferredLang ||
          lesson.language === preferredLang.toLowerCase();

        const categoryMatch =
          lesson.category === category ||
          lesson.category === category.toLowerCase();

        // const quizes =
        //   lesson.interLearning || lesson.interLearning.toLowerCase() === "yes";

        return xpLevelMatch && categoryMatch && preferredLangMatch;
      });
      setFilteredLessons(filtered);
      console.log("Lessons:", filteredLessons);
    } catch (error) {
      console.error("Error querying the database:", error);
    }

  };

  return (
    <div className=" pb-40">
      <section className="section py-14" id="home">
        {/* intro container */}
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-3/3 mx-2">
              <div className="text-center">
                <h1 className="text-6xl font-semibold leading-[70px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 mb-10">
                  Welcome to Roadmap
                </h1>
                <p className="text-base text-gray-400 mb-10">
                  This Roadmap is a powerful tools that provide a structured and
                  visual representation of a plan or strategy. They serve as
                  invaluable guides for individuals, teams, and organizations,
                  helping them navigate their journey towards specific goals and
                  objectives. Whether you're embarking on a complex project,
                  managing a product development cycle, or charting your
                  personal career growth, roadmaps help you stay organized,
                  focused, and on track. By breaking down long-term goals into
                  manageable steps and providing a sense of direction, roadmaps
                  enable effective planning, communication, and progress
                  tracking, ultimately facilitating successful outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* question title container */}
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-3/3 mt-2">
              <div className="text-center">
                <h1 className="text-4xl font-semibold leading-[100px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600">
                  Answer these questions to get started
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* question form */}
        <div className="lg:flex justify-center">
          <Card color="transparent" shadow={false}>
            <form className="mt-2 mb-2 max-w-screen-lg sm:w-150">
              <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                What is your current programming experience level?
              </Typography>

              <div class="flex gap-4 text-center justify-center items-center">

                <Radio
                  name="xpLevel"
                  label="Beginner"
                  checked={xpLevel === "Beginner"}
                  onChange={() => setXpLevel("Beginner")}
                />

                <Radio
                  name="xpLevel"
                  label="Intermediate"
                  checked={xpLevel === "Intermediate"}
                  onChange={() => setXpLevel("Intermediate")}
                />

                <Radio
                  name="xpLevel"
                  label="Advanced"
                  checked={xpLevel === "Advanced"}
                  onChange={() => setXpLevel("Advanced")}
                />
              </div>
              {/* <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                Are you open to learning multiple programming languages if they
                align with your goals?
              </Typography>

              <div class="flex gap-2 text-center justify-center items-center">

                <Radio
                  name="multiLang"
                  label="Yes"
                  checked={multiLang === "Yes"}
                  onChange={() => setMultiLang("Yes")}
                />
                <Radio
                  name="multiLang"
                  label="No"
                  checked={multiLang === "No"}
                  onChange={() => setMultiLang("No")}
                />
              </div> */}

              <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                What is your prefered programming language?
              </Typography>

              <div class="flex gap-2 text-center justify-center items-center">

                <Radio
                  name="preferredLang"
                  label="Java"
                  checked={preferredLang === "Java"}
                  onChange={() => setPreferredLang("Java")}
                />
                <Radio
                  name="preferredLang"
                  label="PHP"
                  checked={preferredLang === "PHP"}
                  onChange={() => setPreferredLang("PHP")}
                />
              </div>

              {preferredLang === "Java" && (
                <Typography
                  color="gray"
                  className="mt-1 font-normal text-center text-lg font-bold"
                >
                  What would you expect to learn?
                </Typography>
              )}

              {preferredLang === "PHP" && (
                <Typography
                  color="gray"
                  className="mt-1 font-normal text-center text-lg font-bold"
                >
                  What would you expect to learn?
                </Typography>
              )}

              {/* Conditional rendering based on the selected language */}

              {preferredLang === "Java" && (
                <div class="flex gap-4 text-center justify-center items-center">
                  <Radio
                    name="category"
                    label="Fundamentals"
                    checked={category === "Fundamentals"}
                    onChange={() => setCategory("Fundamentals")}
                  />

                  <Radio
                    name="category"
                    label="Web Frameworks"
                    checked={category === "Web Frameworks"}
                    onChange={() => setCategory("Web Frameworks")}
                  />

                  <Radio
                    name="category"
                    label="JDBC"
                    checked={category === "JDBC"}
                    onChange={() => setCategory("JDBC")}
                  />
                </div>
              )}

              {preferredLang === "PHP" && (
                <div class="flex gap-4 text-center justify-center items-center">
                  <Radio
                    name="category"
                    label="PHP Basics"
                    checked={xpLevel === "PHP Basics"}
                    onChange={() => setCategory("PHP Basics")}
                  />

                  <Radio
                    name="category"
                    label="Frameworks"
                    checked={xpLevel === "Frameworks"}
                    onChange={() => setCategory("Frameworks")}
                  />

                  <Radio
                    name="category"
                    label="Profilling"
                    checked={xpLevel === "Profilling"}
                    onChange={() => setCategory("Profilling")}
                  />
                </div>
              )}

              <Typography
                color="gray"
                className="mt-1 font-normal text-center text-lg font-bold"
              >
                Do you prefer interactive learning platforms, such as coding
                challenges and hands-on exercises?
              </Typography>

              <div class="flex gap-2 text-center justify-center items-center">

                <Radio
                  name="interLearning"
                  label="Yes"
                  checked={interLearning === "Yes"}
                  onChange={() => setInterLearning("Yes")}
                />
                <Radio
                  name="interLearning"
                  label="No"
                  checked={interLearning === "No"}
                  onChange={() => setInterLearning("No")}
                />
              </div>


              <div class="flex justify-center items-center">
                <Button
                  className="mt-10 bg-black w-max h-12 text-white py-1 px-8 rounded-md center"
                  fullWidth
                  onClick={handleSubmitQuesForm}
                >
                  Submit my Answers
                </Button>
              </div>

            </form>
          </Card>
        </div>

        {/* lesson container */}
        {filteredLessons.length > 0 ? (
          <div className="container">
            <div className="lg:flex justify-center">
              <div className="lg:w-3/3 mt-2">
                <div className="text-center">
                  <h1 className="text-4xl font-semibold leading-[100px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600">
                    Great, Your learning path is Ready!
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              {filteredLessons.map((lesson, i) => (
                <Card
                  className="w-96"
                  onClick={() => {
                    console.log("open modal for: ", lesson._id);
                    setOpenId(lesson._id);
                    handleOpen(lesson._id);
                  }}
                >
                  <List>
                    <ListItem className="outline outline-black">
                      <ListItemPrefix>
                        <h3 className="text-xl font-semibold  tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 mr-5">
                          {i + 1}
                        </h3>
                      </ListItemPrefix>
                      <div>
                        <Typography variant="h6" color="blue-gray">
                          {lesson.title}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="font-normal"
                        >
                          {lesson.xpLevel}
                        </Typography>
                      </div>
                    </ListItem>
                  </List>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </section>

      {/* create lesson form */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: "70%", height: 650, overflow: "auto" }}>
          {currentOpenLesson[0] ? (
            <div className="h-full overflow-y-auto">
              <h2
                className="text-3xl font-semibold leading-[70px] tracking-wide text-transparent bg-clip-text bg-black"
                id="parent-modal-title"
              >
                {currentOpenLesson[0].title}
              </h2>
              <p id="parent-modal-description">
                {currentOpenLesson[0].description}
              </p>
              <p id="parent-modal-description" class="mt-3">
                Programming language:{" "}
                <span class="font-bold">{currentOpenLesson[0].language}</span>
              </p>
              <p id="parent-modal-description">
                Lesson belongs in:{" "}
                <span class="font-bold">{currentOpenLesson[0].category}</span>
              </p>
              <p id="parent-modal-description">
                Experience level:{" "}
                <span class="font-bold">{currentOpenLesson[0].xpLevel}</span>
              </p>
              {currentOpenLesson[0].videoList[0] && (
                <p id="parent-modal-description" class="mt-3">
                  Video Links:{" "}
                  {currentOpenLesson[0].videoList.map((link) => (
                    <>
                      <a
                        href={link}
                        target="_blank"
                        class="text-blue-500 hover:text-blue-800"
                      >
                        {link}
                      </a>
                      <br />
                    </>
                  ))}
                </p>
              )}
              {currentOpenLesson[0].articleList[0] && (
                <p id="parent-modal-description" class="mt-2">
                  Article Links:{" "}
                  {currentOpenLesson[0].articleList.map((link) => (
                    <>
                      <a
                        href={link}
                        target="_blank"
                        class="text-blue-500 hover:text-blue-800"
                      >
                        {link}
                      </a>
                      <br />
                    </>
                  ))}
                </p>
              )}
              {currentOpenLesson[0].quizList[0] && (
                <p id="parent-modal-description" class="mt-2">
                  Quizes Links:{" "}
                  {currentOpenLesson[0].quizList.map((link) => (
                    <>
                      <a
                        href={link}
                        target="_blank"
                        class="text-blue-500 hover:text-blue-800"
                      >
                        {link}
                      </a>
                      <br />
                    </>
                  ))}
                </p>
              )}
              <div className="flex justify-center">
                <Button
                  className="mt-3 bg-gradient-to-l from-pink-400 to-blue-600 w-max h-12 text-white py-1 px-8 rounded-md text-base"
                  onClick={handleClose}
                >
                  Ok
                </Button>
              </div>
            </div>
          ) : (
            <p id="parent-modal-description">
              <span class="font-bold">
                Oops... Something went wrong. Please try again later.
              </span>
            </p>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default roadmapPage;
