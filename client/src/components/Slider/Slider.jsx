import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Slider = ({ img1, img2, img3 }) => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      showArrows={false}
      interval={2000}
    >
      <div>
        <img src={img1} alt={img1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={img2} alt={img2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={img3} alt={img3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Slider;
