import React, { useState } from 'react';

const NewsCard = ({ data }) => {
  const { title, image, headlines, url } = data;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid black',
    cursor: isHovered ? 'pointer' : 'default', // Change cursor on hover
  };

  const cardStyle = {
    width: '300px',
    margin: '25px',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    color : "white",
    borderRadius: '2px',
    overflow: 'hidden',
    backgroundColor: 'rgba(33, 34, 42, 0.8)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const bodyStyle = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleStyle = {
    marginBottom: '10px',
    fontSize: '1.2em',
    color: "#54856f",
    fontWeight: 'bold',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  const textStyle = {
    marginTop : "10px",
    marginBottom: '30px',
    fontSize : "15px",
    marginLeft : "20px",
    lineHeight : "25px",
  };

  return (
    <div style={cardStyle}>
      <img src={image} alt={title} style={imageStyle} />
      <div style={bodyStyle}>
        <div style={titleStyle}>{title}</div>
        <div style={textStyle}>{headlines}</div>
        <a className="read-more" href={url} target="_blank" rel="noopener noreferrer">
          <button style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>Read more</button>
        </a>
      </div>
    </div>
  );
};

export default NewsCard;