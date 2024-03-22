import React from "react";
import Logo from "../../assets/images/logo/logoSPM.jpg";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <>
      <div class="flex flex-col">
        <nav id="nav" class="py-8 md:border-b-0 border-b" role="navigation">
          <div class="container flex flex-wrap items-center md:flex-no-wrap">
            <div href="index.html" class="">
              <Image src={Logo} alt="logo" width={200} height={100} />
            </div>
            <div class="ml-auto md:hidden">
              <button
                onclick="menuToggle()"
                class="flex items-center rounded"
                type="button"
              >
                <i class="pe-7s-menu text-3xl"></i>
              </button>
            </div>
            <div
              id="menu"
              class="w-full md:w-auto h-0 transition-all ease-out duration-300 md:transition-none md:flex-grow md:flex md:items-center opacity-0 md:opacity-100"
            >
              <ul
                id="ulMenu"
                class="flex flex-col duration-300 ease-out sm:transition-none md:flex-row ml-auto mt-5 md:mt-0"
              >
                <Link href={{ pathname: "/" }}>
                  <li>
                    <div
                      class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                      href="index.html"
                      title="Home"
                    >
                      Home
                    </div>
                  </li>
                </Link>

                <Link href={{ pathname: "/roadmap" }}>
                  <li>
                    <div
                      class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                      href="roadmapPage.js"
                      title="Service"
                    >
                      Roadmap
                    </div>
                  </li>
                </Link>

                <Link href={{ pathname: "/workspaces" }}>
                  <li>
                    <div
                      class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                      href="work.html"
                      title="Work"
                    >
                      Workspaces
                    </div>
                  </li>
                </Link>
                <li>
                  <div
                    class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="about.html"
                    title="About"
                  >
                    About
                  </div>
                </li>
                <li>
                  <div
                    class="lg:px-6 font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="contact.html"
                    title="Contact"
                  >
                    Contact
                  </div>
                </li>

                {/* <li>
                  <a
                    class="lg:px-6 outlineoutline-black font-medium font-secondary block text-black/70 hover:text-blue-500 p-3 uppercase text-sm"
                    href="/dashboard/viewLesson"
                    title="ViewLesson"
                  >
                    Dashboard
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>{" "}
    </>
  );
}

export default Header;
