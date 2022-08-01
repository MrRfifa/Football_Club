import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";

export const SidebarData = [
  {
    title: "Main Page",
    path: "/parent",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Kids",
    path: "/kid",
    icon: <FaIcons.FaList />,
    cName: "nav-text",
  },
  {
    title: "Add Kid",
    path: "/addkid",
    icon: <AiIcons.AiOutlineUserAdd />,
    cName: "nav-text",
  },
];
