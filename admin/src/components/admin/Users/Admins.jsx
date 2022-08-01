import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Admins = () => {
  const [loading, setLoading] = useState(true);
  const [adminList, setAdminsList] = useState([]);

  useEffect(() => {
    getAdmins();
  }, []);
  const getAdmins = async () => {
    await axios.get("http://localhost:3001/admin/alladmins").then((res) => {
      if (res.status === 200) {
        setAdminsList(res.data);
      }
      setLoading(false);
    });
  };
  // const deleteUser = async (e, id) => {
  //   e.preventDefault();
  //   try {
  //     if (window.confirm("Are you sure that you want to delete this session")) {
  //       const result = await axios.delete(
  //         `http://localhost:3001/admin/delete-session/${id}`
  //       );
  //       if (result.status === 200) {
  //         swal("Success!", result.data.message, "success");
  //         getAdmins();
  //       }
  //     }
  //   } catch (error) {
  //     swal("Ooops!", "Error while deleting", "error");
  //     console.log(error);
  //   }
  // };

  let adminsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    adminsessions_HTML_TABLE = adminList.map((item, index) => {
      return (
        <tr key={index}>
          <td className="ps-5">{index + 1}</td>
          <td className="ps-5">{item.username}</td>

          {/* <td>
            <Link
              to={`edit-session/${item._id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td> */}
          {/* <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteUser(e, item._id)}
            >
              Delete
            </button>
          </td> */}
        </tr>
      );
    });
  }

  return (
    <div className="container px-4 col-md-8">
      <div className="card-body">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th className="ps-5">ID</th>
              <th className="ps-5">Username</th>
            </tr>
          </thead>
          <tbody>{adminsessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
