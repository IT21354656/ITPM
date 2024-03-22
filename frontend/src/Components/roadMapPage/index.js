import React from "react";

function roadmapPage() {
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default roadmapPage;
