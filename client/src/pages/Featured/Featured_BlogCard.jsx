import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from '../../api/axiosConfig.js';

const Featured_BlogCard = ({ blog }) => {

  const reduxUserData = useSelector((state) => state.userData)

  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const [likedFormData, setLikedFormData] = useState({
    blogID : blog._id,
    userID : reduxUserData.currentUser._id
  })

  const [likedByArray, setLikedByArray] = useState(blog.likedBy.length);

  async function handleLikedSubmit(event){
    event.preventDefault()
    const result = await axios.post('/mentor/likePost', likedFormData)
    setLikedByArray(result.data.data)
  }

  useEffect(() => {
    console.log("UseEffect triggered!!")
  }, [likedByArray, setLikedByArray])

  function defaultOnChange(){
    console.log(likedFormData)
  }

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
    fontWeight: '400',
    color: 'crimson',
    marginTop : "15px",
  };

  const likeButtonContainerStyle = {
    position: 'absolute',
    top: '40px',
    right: '40px',
    display: 'flex',
    alignItems: 'center',
  };

  const heartButtonStyle = {
    background: 'none',
    border: 'none',
    cursor : 'pointer',
  };

  return (
    <div className="user" style={userStyle} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
      <div className="P">

        <img
          onMouseOver={() => setIsImageHovered(true)}
          onMouseOut={() => setIsImageHovered(false)}
          className="user1pic"
          src={blog.mentorImage}
          alt="user1_pic"
          style={user1picStyle}
        />

        <p style={postedByStyle}><span style={{color : "black"}}>Posted By:</span> {blog.mentorName}</p>

        <form className="heart_button" onSubmit={handleLikedSubmit} style={likeButtonContainerStyle}>
          <span className="likes">{likedByArray}</span>
          <input type="text" name="blogID" onChange={defaultOnChange} value={likedFormData.blogID} style={{ display: 'none' }} />
          <input type="text" name="userID" onChange={defaultOnChange} value={likedFormData.userID} style={{ display: 'none' }} />
          <button id="heart" type="submit" style={heartButtonStyle}>
            ❤️
          </button>
        </form>

      </div>

      <p className="titleContent" style={{ marginLeft: '75px', fontWeight: '900' }}>
        {blog.title} :
      </p>

      <hr className="horizontal" style={{ width: "560px", border: 'none', height: '3px', background: 'rgb(22, 72, 43)', margin : "10px 0", marginLeft: '60px' }} />
      
      <div id="timediv" style={{ paddingLeft: '75px' }}>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        
        <p className="timeoncards" style={{ color: 'crimson', marginTop: '20px', textAlign: 'right' }}>
          Posted on: {blog.time}
        </p>
      </div>
    </div>
  );
};

export default Featured_BlogCard;
