import React, { useEffect, useState } from 'react';
import FeaturedBlogCard from './Featured_BlogCard';
import axios from "../../api/axiosConfig.js"

export default function FeaturedBlogs() {

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    axios.get('/mentor/getAllFeaturedBlogs').then((res) => {
      setBlogData(res.data.data)
    })
  }, []);

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(45%, 1fr))',
    gap: '20px',
    padding: '30px',
    marginBottom : "80px",
  };


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

