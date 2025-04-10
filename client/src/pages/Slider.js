import React, { useState } from "react";
import "./slider.css";
// import HeroSlider, { Slide } from "hero-slider";
import slide1 from "./assests/images/slide1.jpg";
import slide2 from "./assests/images/slide2.jpg";
import slide3 from "./assests/images/slide3.jpg";
import slide4 from "./assests/images/slide4.jpg";
import slide5 from "./assests/images/slide5.jpg";
import {
  LuArrowBigLeft,
  LuArrowBigRight,
  LuCircle,
  LuCircleDot,
} from "react-icons/lu";
import { FaCircle, FaCircleDot } from "react-icons/fa6";

const slides = [slide2, slide1, slide3, slide4, slide5];

const Slider = () => {
  const [idx, setIdx] = useState(0);

  const showPrevImage = () => {
    setIdx((idx) => {
      if (idx === 0) return slides.length - 1;
      return idx - 1;
    });
  };

  const showNextImage = () => {
    setIdx((idx) => {
      if (idx === slides.length - 1) return 0;
      return idx + 1;
    });
  };

  // setInterval(() => {
  //   showNextImage();
  // }, 2000);

  return (
    <div
      className="slide-container"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <div className="word-head">MOMENTO</div>
        {slides.map((slide) => (
          <img
            src={slide}
            key={slide}
            alt=""
            className="img-slider-img"
            style={{ translate: `${-100 * idx}%` }}
          />
        ))}
      </div>
      <button
        className="img-slider-btn left"
        onClick={showPrevImage}
        style={{ left: "0" }}
        aria-label="View Previous Image"
      >
        <LuArrowBigLeft />
      </button>
      <button
        className="img-slider-btn right"
        onClick={showNextImage}
        style={{ right: "0" }}
        aria-label="View Next Image"
      >
        <LuArrowBigRight />
      </button>
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: "50%",
          translate: "-50%",
          display: "flex",
          gap: "0.25rem",
        }}
      >
        {slides.map((_, index) => (
          <button key={index} onClick={() => setIdx(index)} className="img-slider-dot-btn" aria-label={`View Image at ${index}`}>
            {index === idx ? <LuCircleDot /> : <LuCircle />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
