import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Parent.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Kids = () => {
  const [listKids, setListKids] = useState([]);
  // const { getLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    getKids();
  }, []);
  const getKids = async () => {
    const result = await axios.get("http://localhost:3001/kid");
    if (result.status === 200) {
      setListKids(result.data);
    }
  };

  const onDeleteUser = async (id) => {
    if (window.confirm("Are you sure that you want to delete this kid")) {
      const result = await axios.delete(
        `http://localhost:3001/kid/delete/${id}`
      );
      if (result.status === 200) {
        toast.success("Deleted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getKids();
      }
    }
  };

  return (
    <div className="kid">
      <div style={{ marginTop: "150px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>First Name</th>
              <th style={{ textAlign: "center" }}>Last Name</th>
              <th style={{ textAlign: "center" }}>Date of birth</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {listKids &&
              listKids.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td style={{ textAlign: "center" }}>{item.firstName}</td>
                    <td style={{ textAlign: "center" }}>{item.lastName}</td>
                    <td style={{ textAlign: "center" }}>
                      {item.dateOfBirth.substring(0, 10)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Link to={`/update/${item._id}`}>
                        <button className="btn btn-edit">Edit</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => onDeleteUser(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kids;
