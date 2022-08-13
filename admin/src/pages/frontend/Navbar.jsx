import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const history = useNavigate();
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const logout = async (e) => {
    e.preventDefault();
    const result = await axios.get("http://localhost:3001/admin/logoutadmin");
    await getLoggedIn();
    history("/");
    swal("Success!", result.data.message, "success");
  };
  var authButtons = "";
  getLoggedIn();
  if (!loggedIn) {
    authButtons = (
      <ul className="navbar-nav">
        <li className="nav-item ">
          <Link className="nav-link active" to="/">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    authButtons = (
      <li className="nav-item">
        <button
          type="button"
          className="nav-link btn btn-danger btn-sm text-white"
          onClick={logout}
        >
          Logout
        </button>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">
          UrClub Administration
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">
                Home
              </Link>
            </li> */}
            {authButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
