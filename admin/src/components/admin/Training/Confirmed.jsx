import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Confirmed = () => {
  const [loading, setLoading] = useState(true);
  const [confirmedList, setConfirmedList] = useState([]);

  useEffect(() => {
    getConfirmedSessions();
  }, []);
  const getConfirmedSessions = async () => {
    await axios.get("http://localhost:3001/admin/getconfirmed").then((res) => {
      if (res.status === 200) {
        setConfirmedList(res.data);
      }
      setLoading(false);
    });
  };

  const deleteSession = async (e, id) => {
    e.preventDefault();
    try {
      if (window.confirm("Are you sure that you want to delete this session")) {
        const result = await axios.delete(
          `http://localhost:3001/admin/delete-session/${id}`
        );
        if (result.status === 200) {
          swal("Success!", result.data.message, "success");
          getConfirmedSessions();
        }
      }
    } catch (error) {
      swal("Ooops!", "Error while deleting", "error");
      console.log(error);
    }
  };

  let confirmedsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    confirmedsessions_HTML_TABLE = confirmedList.map((item, index) => {
      item.date = item.date
        .slice(0, 16)
        .split("T")
        .join(" ");
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.date}</td>
          <td>{item.adminUname}</td>
          <td>{item.coachUname}</td>
          <td>
            <Link
              to={`edit-session/${item._id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteSession(e, item._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="container px-4">
      <div className="card-body">
        <div
          className="badge bg-danger text-wrap"
          style={{ width: "7rem", marginLeft: "10px", marginBottom: "10px" }}
        >
          Time zone UTC-2
        </div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Admin Username</th>
              <th>Coach Username</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{confirmedsessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Confirmed;
