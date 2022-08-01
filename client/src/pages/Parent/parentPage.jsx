import React from "react";
import Slider from "../../components/Slider/Slider";
import "./Parent.css";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";

function parentPage() {
  return (
    <div className="main">
      <Slider img1={img1} img2={img2} img3={img3}></Slider>
    </div>
  );
}

export default parentPage;
