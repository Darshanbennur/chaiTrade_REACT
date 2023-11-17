import React, { useState } from 'react';
import FeaturedBlogs from './FeaturedBlogs';
import image from "../../images/charts.jpg";

export default function Featured_main() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const backpicStyle = {
    width: '90%',
    height: '50vh',
    position: 'relative',
    padding: '0 5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const backgroundPicStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'cover',
  };

  const contentH1Style = {
    cursor: 'pointer',
    fontFamily: 'Sacramento, cursive',
    fontSize: '90px',
    color: isHovered ? 'transparent' : '#65a893',
    textAlign: 'center',
    WebkitTextStroke: isHovered ? '2px #88b9a9' : 'none',
    fontWeight: 'normal',
  };

  return (
    <div className="App">
      <div style={backpicStyle} className="backpic row">
        <img src={image} style={backgroundPicStyle} alt="background" />
        <div className="content">
          <h1 onMouseOver={handleHover} onMouseOut={handleMouseOut} style={contentH1Style}>Welcome to Featured Blogs</h1>
        </div>
      </div>
      <FeaturedBlogs />
    </div>
  );
}

