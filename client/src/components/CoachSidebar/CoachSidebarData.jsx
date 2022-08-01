import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Main Page",
    path: "/coach",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Pending",
    path: "/pending",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },
  {
    title: "Confirmed",
    path: "/confirmed",
    icon: <GiIcons.GiConfirmed />,
    cName: "nav-text",
  },
  {
    title: "Done",
    path: "/done",
    icon: <IoIcons.IoMdDoneAll />,
    cName: "nav-text",
  },
];
