import React, { useState } from 'react';

export default function BlogCard({ Mentorblog }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const userStyle = {
    cursor: 'pointer',
    borderRadius: '5px',
    background: '#bdcfc9',
    padding: '15px',
    width: '95%',
    margin: '15px',
    fontFamily: 'Montserrat-light',
    position: 'relative',
    opacity: isHovered ? '1' : '0.8',
  };

  const user1picStyle = {
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '10px',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    transition: 'transform 0.2s ease-in-out',
    transform: isImageHovered ? 'scale(1.5)' : 'scale(1)',
  };

  const postedByStyle = {
    position: 'absolute',
    top: '20px',
    left: '100px',
    fontWeight: '500',
    color: 'crimson',
    marginTop : "13px",
  };

  return (
    <div className="user" style={userStyle} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
      <div className="P">
        <img
          onMouseOver={() => setIsImageHovered(true)}
          onMouseOut={() => setIsImageHovered(false)}
          className="user1pic"
          src={Mentorblog.mentorImage}
          alt="user1_pic"
          style={user1picStyle}
        />
        <p style={postedByStyle}><span style={{color : "black"}}>Posted By: </span>{Mentorblog.mentorName}</p>
      </div>

      <p className="titleContent" style={{ marginLeft: '75px', fontWeight: '900' }}>
        {Mentorblog.title} :
      </p>

      <hr className="horizontal" style={{ margin: "10px 0", width: "550px", marginLeft: '60px', border: 'none', height: '3px', background: 'rgb(22, 72, 43)' }} />
      
      <div id="timediv" style={{ paddingLeft: '75px' }}>
        <p>{Mentorblog.content}</p>
        <p className="timeoncards" style={{ color: 'crimson', marginTop: '20px', textAlign: 'right' }}>
          Posted on: {Mentorblog.time}
        </p>
      </div>
    </div>
  );
};