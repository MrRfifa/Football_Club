import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Main Page",
    path: "/coach",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "All plays",
    path: "/all",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },
];
