import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Qrcode from "../../components/Modal/Qrcode";
import AuthContext from "../../context/AuthContext";

const PendingSessions = () => {
  const { username } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    getPendingSessions();
  }, []);
  const getPendingSessions = async () => {
    await axios.get("http://localhost:3001/member/participated").then((res) => {
      if (res.status === 200) {
        setPendingList(res.data);
      }
      setLoading(false);
    });
  };

  let pendingsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    pendingsessions_HTML_TABLE = pendingList.map((item, index) => {
      item.date = item.date.slice(0, 16).split("T").join(" ");
      return (
        <>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td>{item.adminUname}</td>
            <td>{item.coachUname}</td>
            <td>
              <Qrcode
                username={username}
                coach={item.coachUname}
                admin={item.adminUname}
                date={item.date}
              />
            </td>
          </tr>
        </>
      );
    });
  }

  return (
    <div className="container-fluid px-4 mt-5">
      <h1
        style={{
          marginTop: "100px",
          marginLeft: "250px",
        }}
      >
        Confirmed sessions
      </h1>
      <div>
        <div className="container px-4">
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Responsible Admin</th>
                  <th>Responsible Coach</th>
                  <th>QR Code</th>
                </tr>
              </thead>
              <tbody>{pendingsessions_HTML_TABLE}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingSessions;
