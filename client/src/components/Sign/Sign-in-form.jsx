import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        username,
        password,
      };

      const result = await axios.post(
        "http://localhost:3001/auth/login",
        loginData
      );

      const loggedInRes = await axios.get(
        "http://localhost:3001/auth/loggedIn"
      );
      const type = loggedInRes.data.type.toLowerCase();
      await getLoggedIn();
      history(`/${type}`);
      swal("Success!", result.data.message, "success");
    } catch (error) {
      swal("Oops!", error.response.data.error, "error");
      setUsername("");
      setPassword("");
    }
  }

  return (
    <div
      style={{
        minHeight: 692,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: 0,
        overflow: "hidden",
        background:
          "linear-gradient(207deg, rgba(255,73,158,1) 0%, rgba(164,128,207,1) 47%, rgba(73,182,255,1) 100%)",
      }}
    >
      <div
        style={{
          height: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Link
          to="/"
          style={{
            marginLeft: 32,
            marginTop: 32,
            textDecoration: "none",
            color: "#fff",
            fontWeight: "700",
            fontSize: 32,
            width: 120,
          }}
        >
          UrClub
        </Link>
      </div>
      <div className="container py-5 mt-5 ">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-header">
                <h4>Sign in</h4>
              </div>
              <div className="card-body">
                <form onSubmit={login}>
                  <div className="form-group mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      className="form-control"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      required
                      autoComplete="off"
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      className="form-control"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                      autoComplete="off"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group mb-3 d-flex justify-content-between">
                    <button className="btn btn-info " type="submit">
                      Sign in
                    </button>
                    <span className="mt-3">
                      Don't have an account?{" "}
                      <Link to="/sign-up" className="text-decoration-none">
                        Sign up
                      </Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
