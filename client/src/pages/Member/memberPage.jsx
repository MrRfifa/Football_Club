import React from "react";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import Slider from "../../components/Slider/Slider";

const MemberPage = () => {
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "300px",
        width: "1050px",
        position: "fixed",
      }}
    >
      <Slider img1={img1} img2={img2} img3={img3}></Slider>
    </div>
  );
};

export default MemberPage;
