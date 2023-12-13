import React, { useEffect, useState } from 'react';
import FeaturedBlogCard from './Featured_BlogCard';
import axios from "../../api/axiosConfig.js"

export default function FeaturedBlogs() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get('/mentor/getAllFeaturedBlogs');
        setBlogData(response.data.data);
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(45%, 1fr))',
    gap: '20px',
    padding: '30px',
    marginBottom: "80px",
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
      <div className="profiles" style={containerStyle}>
        {blogData.map((blog, index) => (
          <div key={index}>
            <FeaturedBlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
};

