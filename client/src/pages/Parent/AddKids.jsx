import React from "react";
import "./Parent.css";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function AddKids() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState(
    new Date(2005, 1, 1).toISOString().slice(0, 10)
  );

  let { id } = useParams();
  let history = useNavigate();

  useEffect(() => {
    if (id) {
      getSingleKid(id);
    }
  }, [id]);
  const getSingleKid = async (id) => {
    const result = await axios.get(`http://localhost:3001/kid/${id}`);
    if (result.status === 200) {
      setFirstname(result.data.firstName);
      setLastname(result.data.lastName);
      const d = new Date(result.data.dateOfBirth).toISOString().slice(0, 10);
      setDate(d);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      try {
        const kidData = {
          firstName: firstname,
          lastName: lastname,
          dateOfBirth: date,
        };
        const result = await axios.post(
          "http://localhost:3001/kid/addKid",
          kidData
        );
        if (result.status === 200) {
          toast.success(result.data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history("/kid");
        }
      } catch (err) {
        toast.error(err.response.data.error);
        console.log(err);
      }
    } else {
      try {
        const kidData = {
          firstName: firstname,
          lastName: lastname,
          dateOfBirth: date,
        };
        const result = await axios.put(
          `http://localhost:3001/kid/update/${id}`,
          kidData
        );
        if (result.status === 200) {
          toast.success(result.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          history("/kid");
        }
      } catch (err) {
        toast.error(err.response.data.error);
        console.log(err);
      }
    }
  };

  return (
    <div className="addkid">
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstname">Firstname</label>
        <input
          type="text"
          id="firstname"
          autoComplete="off"
          placeholder="Enter firstname"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          value={firstname}
        ></input>
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          id="lastname"
          autoComplete="off"
          placeholder="Enter lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          value={lastname}
        ></input>
        <label htmlFor="date">Date of birth</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          min="2005-01-01"
          max="2020-12-31"
          onChange={(e) => {
            setDate(e.target.value);
            console.log(typeof date);
          }}
        ></input>
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
}

export default AddKids;
