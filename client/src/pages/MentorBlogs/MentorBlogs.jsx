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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.post('/mentor/getMentorBlogs', userID);
        setBlogs(response.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))',
    gap: '10px',
    padding: '30px',
    marginBottom: "100px"
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", margin: "5rem 0rem" }}>
        <l-trefoil
          size="40"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4"
          color="white"
        ></l-trefoil>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <h3>Error Occured...</h3>
      </>
    )
  }

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

