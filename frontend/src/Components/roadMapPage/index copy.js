import React, { useEffect, useState } from "react";

function roadmapPage() {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(`http://localhost:7000/api/question`);
      const json = await response.json();
      console.log(json);
      console.log(json[0]);
      if (response.ok) {
        setQuestions(json);
      }
    };

    fetchQuestions();
  }, []);

  // Filter the questions to get only radio button questions
  const radioQuestions = questions
    ? questions.filter((question) => question.type === "radio")
    : [];

  return (
    <div className=" pb-40">
      <section className="section py-14" id="home">
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

        {/* question container */}
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-3/3 mx-2">
              <div className="text-center">
                <h1 className="text-4xl font-semibold leading-[100px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600">
                  Answer these questions to get started
                </h1>

                {radioQuestions.map((question) => (
                  <div
                    className="text-base text-gray-700 mb-10"
                    key={question._id}
                  >
                    <p>{question.questionText}</p>

                    <div class="flex gap-10">
                      <div class="inline-flex items-center">
                        <label
                          class="relative flex cursor-pointer items-center rounded-full p-3"
                          for="html"
                          data-ripple-dark="true"
                        >
                          <input
                            id="html"
                            name="type"
                            type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                          />
                          <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3.5 w-3.5"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <circle
                                data-name="ellipse"
                                cx="8"
                                cy="8"
                                r="8"
                              ></circle>
                            </svg>
                          </div>
                        </label>
                        <label
                          class="mt-px cursor-pointer select-none font-light text-gray-700"
                          for="html"
                        >
                          {question.answer[0]}
                        </label>
                      </div>
                      <div class="inline-flex items-center">
                        <label
                          class="relative flex cursor-pointer items-center rounded-full p-3"
                          for="html"
                          data-ripple-dark="true"
                        >
                          <input
                            id="html"
                            name="type"
                            type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                          />
                          <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3.5 w-3.5"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <circle
                                data-name="ellipse"
                                cx="8"
                                cy="8"
                                r="8"
                              ></circle>
                            </svg>
                          </div>
                        </label>
                        <label
                          class="mt-px cursor-pointer select-none font-light text-gray-400"
                          for="html"
                        >
                          {question.answer[1]}
                        </label>
                      </div>
                      <div class="inline-flex items-center">
                        <label
                          class="relative flex cursor-pointer items-center rounded-full p-3"
                          for="html"
                          data-ripple-dark="true"
                        >
                          <input
                            id="html"
                            name="type"
                            type="radio"
                            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-pink-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                          />
                          <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-pink-500 opacity-0 transition-opacity peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-3.5 w-3.5"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                            >
                              <circle
                                data-name="ellipse"
                                cx="8"
                                cy="8"
                                r="8"
                              ></circle>
                            </svg>
                          </div>
                        </label>
                        <label
                          class="mt-px cursor-pointer select-none font-light text-gray-700"
                          for="html"
                        >
                          {question.answer[2]}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default roadmapPage;
