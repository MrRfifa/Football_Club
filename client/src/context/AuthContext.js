import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [type, setType] = useState("nothing");
  const [userId, setUserId] = useState("nill");
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  async function getLoggedIn() {
    const loggedInRes = await axios.get("http://localhost:3001/auth/loggedIn");

    setLoggedIn(loggedInRes.data.loggedIn);
    setType(loggedInRes.data.type);
    setUserId(loggedInRes.data.userid);
    setUsername(loggedInRes.data.username);
    setLastName(loggedInRes.data.lastName);
    setFirstName(loggedInRes.data.firstName);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        getLoggedIn,
        type,
        userId,
        username,
        lastName,
        firstName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
