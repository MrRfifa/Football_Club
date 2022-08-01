import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Coaches = () => {
  const [loading, setLoading] = useState(true);
  const [coachList, setCoachesList] = useState([]);

  useEffect(() => {
    getCoaches();
  }, []);
  const getCoaches = async () => {
    await axios.get("http://localhost:3001/admin/allcoaches").then((res) => {
      if (res.status === 200) {
        setCoachesList(res.data);
      }
      setLoading(false);
    });
  };

  let coachsessions_HTML_TABLE = "";
  if (loading) {
    return <h4>Loading data...</h4>;
  } else {
    coachsessions_HTML_TABLE = coachList.map((item, index) => {
      return (
        <tr key={index}>
          <td className="ps-2">{index + 1}</td>
          <td className="ps-2">{item.username}</td>
          <td className="ps-2">{item.options.length}</td>
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
              <th className="ps-2">ID</th>
              <th className="ps-2">Username</th>
              <th className="ps-2">Confirmed Sessions</th>
            </tr>
          </thead>
          <tbody>{coachsessions_HTML_TABLE}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Coaches;
