import React from "react";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";
import * as Io5Icons from "react-icons/io5";

export const ParentSidebarData = [
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
    icon: <Io5Icons.IoPersonAddSharp />,
    cName: "nav-text",
  },
];
export const MemberSidebarData = [
  {
    title: "Main Page",
    path: "/member",
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

export const CoachSidebarData = [
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
