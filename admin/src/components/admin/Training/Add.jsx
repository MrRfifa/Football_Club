import React from "react";
import swal from "sweetalert";
import axios from "axios";
import { useState } from "react";

const Add = () => {
  const [date, setDate] = useState(
    new Date(
      new Date().getTime() +
        new Date().getTimezoneOffset() * 60000 +
        3600000 * 4
    )
      .toISOString()
      .slice(0, 16)
  );
  const [confirmed] = useState(false);
  const [coachUname] = useState("none");
  async function submitSession(e) {
    e.preventDefault();
    try {
      const Data = {
        date,
        coachUname,
        confirmed,
      };
      const result = await axios.post(
        "http://localhost:3001/admin/addsession",
        Data
      );
      if (result.status === 200) {
        swal("Success!", result.data.message, "success");
        setDate(new Date().toISOString().slice(0, 16));
        window.location.reload(false);
      }
    } catch (error) {
      swal("Error!", error.response.data.error, "error");
    }
  }
  return (
    <div className="row justify-content-center">
      <div className="form-group mb-3 col-md-6 ">
        <form onSubmit={submitSession}>
          <div className="form-group mb-3">
            <label htmlFor="date" className="form-label">
              Choose date and time for a training session
              <div
                className="badge bg-danger text-wrap"
                style={{ width: "7rem", marginLeft: "10px" }}
              >
                Time zone UTC
              </div>
            </label>
            <input
              type="datetime-local"
              name="datetime"
              className="form-control"
              value={date}
              min={date}
              max="2023-06-14T17:00"
              onChange={(e) => {
                setDate(e.target.value);
                console.log(date);
              }}
            ></input>
          </div>
          <div className="form-group mb-3">
            <button className="btn btn-primary" type="submit">
              Add session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
