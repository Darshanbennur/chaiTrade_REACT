import React, { useEffect, useState } from 'react';
import MentorBlogCard from './Mentor_BlogCard';
import axios from "../../api/axiosConfig.js"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MentorBlogs() {
  const navigate = useNavigate();
  const reduxUserData = useSelector((state) => state.userData)

  const [userID, setUserID] = useState({
    arrayID: reduxUserData.currentUser.arrayID
  })

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    if (reduxUserData.isUserloggedIn === false) {
      navigate('/login');
    }
    else {
      setUserID({
        arrayID: reduxUserData.currentUser.arrayID
      });
      axios.post('/mentor/getMentorBlogs', userID).then((res) => {
        setBlogs(res.data.data)
      })
    }
  }, []);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))',
    gap: '10px',
    padding: '30px',
    marginBottom: "100px"
  };

  return (
    <div>
      <div className="Mentorprofiles" style={containerStyle}>
        {blogs.map((Mentorblog) => (
          <div key={Mentorblog._id}>
            <MentorBlogCard Mentorblog={Mentorblog} />
          </div>
        ))}
      </div>
    </div>
  );
};

