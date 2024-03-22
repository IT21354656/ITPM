import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  LogOut as LogOutIcon,
} from "lucide-react";
import { useContext, createContext, useState } from "react";
import { FaVideo, FaMicrophone } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsFillChatRightTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
// import Image from "next/image";
// import AppTopNavbar from "./AppTopNavbar";
import { useRouter } from "next/router";

const SidebarContext = createContext(undefined);

const SideNavbar = ({ expandContent }) => {
  const [expanded, setExpanded] = useState(true);
  const router = useRouter();

  const navItems = [
    {
      icon: <LuLayoutDashboard />,
      text: "Dashboard",
    },
    {
      icon: <BsFillChatRightTextFill />,
      text: "Chats",
    },
    {
      icon: <FaVideo />,
      text: "Meeting",
    },
    {
      icon: <FaMicrophone />,
      text: "Interview",
    },
    {
      icon: <IoSettings />,
      text: "Settings",
    },
    {
      icon: <LogOutIcon />,
      text: "Logout",
    },
  ];
  const exapndOption = () => {
    if (expanded) {
      setExpanded(false);
      expandContent(false);
    } else {
      setExpanded(true);
      expandContent(true);
    }
  };
  return (
    <div className="flex h-screen">
      <aside
        className={`h-screen ${
          expanded ? "w-72" : "w-16"
        } fixed left-0 top-0 bg-white shadow-sm transition-all ease-in-out duration-300 dark:bg-slate-800`}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            <h1
              className={`text-base text-center cursor-pointer font-bold text-gray-600 pb-4 w-full overflow-hidden ${
                expanded ? "h-auto" : "h-0 hidden"
              }`}
            >
              Rookii
            </h1>
            <button
              onClick={() => exapndOption()}
              className="p-1.5 mb-4 rounded-lg bg-gray-50 hover:bg-gray-100 dark:hover:bg-indigo-100 dark:bg-slate-800 text-gray-600"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          {expanded && <hr className="my-2 border-gray-300 mx-8" />}

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex flex-col place-items-center px-3">
              {navItems.map((item, index) => (
                <SidebarItem key={index} {...item} />
              ))}
            </ul>
          </SidebarContext.Provider>

          <hr className="my-2 border-gray-300 mx-8" />

          <div className="fixed bottom-0 left-0 w-60 flex p-3">
            {/* <Image
              src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360"
              alt=""
              className="w-10 h-10 rounded-md"
              width={10}
              height={10}
            /> */}
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Udesh </h4>
                <span className="text-xs text-gray-600">Udesh@gmail.com</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>
      {/* <AppTopNavbar isExpanded={expanded} /> */}
    </div>
  );
};

const SidebarItem = ({ icon, text, active, alert, action }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        expanded ? "w-60 justify-left pl-14" : "w-12 justify-center"
      } ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-100 text-gray-600"
      }`}
      onClick={action}
    >
      <span className="icon text-2xl">{icon}</span>

      <span
        className={`overflow-hidden transition-all justify-center text-left ${
          expanded ? "ml-6" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default SideNavbar;
