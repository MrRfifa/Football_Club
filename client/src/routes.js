import { Route, Routes } from "react-router-dom";

import Home from "./pages/MainPage/Home";
import SigninPage from "./pages/MainPage/SigninPage";
import SignupPage from "./pages/MainPage/SignupPage";

import MemberPage from "./pages/Member/memberPage";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import ParentPage from "./pages/Parent/parentPage";
import Kids from "./pages/Parent/Kids";
import AddKids from "./pages/Parent/AddKids";
import CoachPage from "./pages/Coach/coachPage";
import ParentSidebar from "../src/components/ParentSidebar/ParentSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoachSidebar from "./components/CoachSidebar/CoachSidebar";
import MemberSidebar from "./components/MemberSidebar/MemberSidebar";
import AllPlays from "./pages/Coach/AllPlays";
import PageNotFound from "./pages/NotFound/NotFound";

function Router() {
  const { type, username } = useContext(AuthContext);
  return (
    <>
      {type === "Parent" && <ParentSidebar username={username} />}
      {type === "Coach" && <CoachSidebar username={username} />}
      {type === "Member" && <MemberSidebar username={username} />}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {type === "nothing" && (
          <>
            <Route path="/" exact element={<Home />} />
            <Route path="/sign-in" element={<SigninPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
        {type === "Parent" && (
          <>
            <Route path="/parent" exact element={<ParentPage />} />
            <Route path="/kid" element={<Kids />} />
            <Route path="/addkid" element={<AddKids />} />
            <Route path="/update/:id" element={<AddKids />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
        {type === "Coach" && (
          <>
            <Route path="/coach" element={<CoachPage />} />
            <Route path="/all" element={<AllPlays />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
        {type === "Member" && (
          <>
            <Route path="/member" element={<MemberPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default Router;
