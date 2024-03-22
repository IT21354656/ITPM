import React from "react";
import Logo from "../../assets/images/logo/logoSPM.jpg";
import Image from "next/image";

function CommonHeader() {
  return (
    <>
      <div className="flex flex-col">
        <nav id="nav" className="py-8 md:border-b-0 border-b" role="navigation">
          <div className="container flex flex-wrap items-center md:flex-no-wrap">
            <a href="index.html" className="">
              <Image src={Logo} alt="logo" width={200} height={100} />
            </a>
            <div className="ml-auto md:hidden">
              <button
                onclick="menuToggle()"
                className="flex items-center rounded"
                type="button"
              >
                <i className="pe-7s-menu text-3xl"></i>
              </button>
            </div>
            <div
              id="menu"
              className="w-full md:w-auto h-0 transition-all ease-out duration-300 md:transition-none md:flex-grow md:flex md:items-center opacity-0 md:opacity-100"
            >
              <ul
                id="ulMenu"
                className="flex flex-col duration-300 ease-out sm:transition-none md:flex-row ml-auto mt-5 md:mt-0"
              >
                <li>
                  <a
                    className="lg:px-6 font-medium font-secondary block text-blue-500 p-3 uppercase text-sm"
                    href="index.html"
                    title="Home"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="about.html"
                    title="About"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="service.html"
                    title="Service"
                  >
                    Service
                  </a>
                </li>
                <li>
                  <a
                    className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="work.html"
                    title="Work"
                  >
                    Work
                  </a>
                </li>
                <li>
                  <a
                    className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="blog.html"
                    title="Blog"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="contact.html"
                    title="Contact"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>{" "}
    </>
  );
}

export default CommonHeader;
