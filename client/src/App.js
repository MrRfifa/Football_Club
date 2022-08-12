import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Router from "./routes";
import { AuthContextProvider } from "./context/AuthContext";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function App() {
  const history = useNavigate();
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: async function ({ command, route }) {
        if (command === "signupCommand") {
          history(route);
        } else if (command === "signinCommand") {
          history(route);
        } else if (command === "homeCommand") {
          history(route);
        }
      },
    });
  }, [history]);
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
