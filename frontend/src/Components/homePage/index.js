import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div className=" pb-40">
      <section className="section py-14" id="home">
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-2/3 mx-2">
              <div className="text-center">
                <h1 className="text-4xl font-semibold leading-[50px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-pink-400 to-blue-600 mb-10">
                  Constructive Programming Learning Space for Beginners
                </h1>
                <h1 className="text-2xl text-black">To the Code Editor</h1>

                <Link href={{ pathname: "/compiler" }}>
                  <Button
                    className="mt-3 bg-black w-max h-12 text-white py-1 px-8 rounded-md center"
                    fullWidth
                  >
                    Editor
                  </Button>
                </Link>

                <br />
                <br />
                <p className="text-base text-gray-400">
                  <br />
                  <br />
                  🚀 Unlock Your Coding Potential 🚀
                  <br />
                  Are you ready to take your coding skills to the next level?
                  Look no further! CodeCompilerPro is your one-stop destination
                  for all things coding. Whether you're a seasoned programmer or
                  just getting started, we've got the tools and resources you
                  need to excel in the world of coding.
                </p>
                <br />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section class="section">
        <div class="v">
          <div id="grid" class="md:flex justify-center">
            <div class="md:w-1/3 p-3 picture-item" data-groups='["mockup"]'>
              <div class="relative block overflow-hidden rounded group transition-all duration-500">
                <div
                  class="rounded transition-all duration-500 group-hover:scale-105 border-4 border-gray-200"
                  alt="work-image"
                >
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                </div>
                <a
                  href="javascript:void(0)"
                  class="absolute inset-3 flex items-end cursor-pointer rounded bg-white p-3 opacity-0 transition-all duration-500 group-hover:opacity-80"
                >
                  <div>
                    <p class="text-sm text-gray-400">Media, Icons</p>
                    <h6 class="text-base text-black font-medium">
                      Open Imagination
                    </h6>
                  </div>
                </a>
              </div>
            </div>

            <div class="md:w-1/3 p-3 picture-item" data-groups='["mockup"]'>
              <div class="relative block overflow-hidden rounded group transition-all duration-500">
                <div
                  class="rounded transition-all duration-500 group-hover:scale-105 border-4 border-gray-200"
                  alt="work-image"
                >
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                </div>
                <a
                  href="javascript:void(0)"
                  class="absolute inset-3 flex items-end cursor-pointer rounded bg-white p-3 opacity-0 transition-all duration-500 group-hover:opacity-80"
                >
                  <div>
                    <p class="text-sm text-gray-400">Media, Icons</p>
                    <h6 class="text-base text-black font-medium">
                      Open Imagination
                    </h6>
                  </div>
                </a>
              </div>
            </div>

            <div class="md:w-1/3 p-3 picture-item" data-groups='["mockup"]'>
              <div class="relative block overflow-hidden rounded group transition-all duration-500">
                <div
                  class="rounded transition-all duration-500 group-hover:scale-105 border-4 border-gray-200"
                  alt="work-image"
                >
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                </div>
                <a
                  href="javascript:void(0)"
                  class="absolute inset-3 flex items-end cursor-pointer rounded bg-white p-3 opacity-0 transition-all duration-500 group-hover:opacity-80"
                >
                  <div>
                    <p class="text-sm text-gray-400">Media, Icons</p>
                    <h6 class="text-base text-black font-medium">
                      Open Imagination
                    </h6>
                  </div>
                </a>
              </div>
            </div>

            <div class="md:w-1/3 p-3 picture-item" data-groups='["mockup"]'>
              <div class="relative block overflow-hidden rounded group transition-all duration-500">
                <div
                  class="rounded transition-all duration-500 group-hover:scale-105 border-4 border-gray-200"
                  alt="work-image"
                >
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                  <br /> <br /> <br /> <br />
                  text fdds sfg sfg fsg
                </div>
                <a
                  href="javascript:void(0)"
                  class="absolute inset-3 flex items-end cursor-pointer rounded bg-white p-3 opacity-0 transition-all duration-500 group-hover:opacity-80"
                >
                  <div>
                    <p class="text-sm text-gray-400">Media, Icons</p>
                    <h6 class="text-base text-black font-medium">
                      Open Imagination
                    </h6>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default HomePage;
