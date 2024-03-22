import React from "react";
import Logo from "../../assets/images/logo/logoSPM.jpg";
import Image from "next/image";

function Footer() {
  return (
    <div className="border-t py-8">
      <div className="container">
        <div className="flex">
          <div className="w-full">
            <div className="text-center">
              <p className="font-bold text-xl mt-2 uppercase">ROOKIESCRIPT</p>
              <p className=" text-sm mt-2">
                All Right Reserved
                <br />
                Developed by Brogrammers
              </p>
              <ul className="flex justify-center mt-8 gap-3">
                <li>
                  <a
                    className="w-11 h-11 rounded flex items-center justify-center text-lg bg-gray-100 text-black hover:text-white hover:bg-blue-500 transition-all"
                    href="javascript:void(0)"
                  >
                    {" "}
                    <i className="icofont-dribble"></i>{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="w-11 h-11 rounded flex items-center justify-center text-lg bg-gray-100 text-black hover:text-white hover:bg-blue-500 transition-all"
                    href="javascript:void(0)"
                  >
                    {" "}
                    <i className="icofont-facebook"></i>{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="w-11 h-11 rounded flex items-center justify-center text-lg bg-gray-100 text-black hover:text-white hover:bg-blue-500 transition-all"
                    href="javascript:void(0)"
                  >
                    {" "}
                    <i className="icofont-skype"></i>{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="w-11 h-11 rounded flex items-center justify-center text-lg bg-gray-100 text-black hover:text-white hover:bg-blue-500 transition-all"
                    href="javascript:void(0)"
                  >
                    {" "}
                    <i className="icofont-twitter"></i>{" "}
                  </a>
                </li>
                <li>
                  <a
                    className="w-11 h-11 rounded flex items-center justify-center text-lg bg-gray-100 text-black hover:text-white hover:bg-blue-500 transition-all"
                    href="javascript:void(0)"
                  >
                    {" "}
                    <i className="icofont-whatsapp"></i>{" "}
                  </a>
                </li>
              </ul>

              <p className="text-muted mt-8">
                {" "}
                {/* © <script>document.write(new Date().getFullYear())</script>{" "}
                Buckzo. By MyraStudio */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
