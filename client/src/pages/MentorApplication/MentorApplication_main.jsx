import React, { useState } from "react";
import MentorApplicationForm from "./MentorApplicationForm";
import image from "../../images/charts.jpg";
import Footer from "../../components/Footer";

export default function MentorApplicationMain() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const backgroundPicStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    objectFit: "cover",
  };

  const chartsHeadingStyle = {
    cursor: "pointer",
    fontFamily: "Sacramento, cursive",
    fontSize: "90px",
    color: isHovered ? "transparent" : "#65a893",
    textAlign: "center",
    WebkitTextStroke: isHovered ? "2px #88b9a9" : "none",
    fontWeight: "normal",
  };

  return (
    <div>
      <div className="backpic row">
        <img src={image} style={backgroundPicStyle} alt="background" />
      </div>
      <h1
        className="charts-heading"
        onMouseOver={handleHover}
        onMouseOut={handleMouseOut}
        style={chartsHeadingStyle}
      >
        Apply to be a Mentor
      </h1>
      <MentorApplicationForm />
      {/* <Footer/> */}
    </div>
  );
}
