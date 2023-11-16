import React, { useEffect, useState } from 'react';
import axios from "../../api/axiosConfig.js"

const BlogList = () => {

  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get('/blog/allBlogs').then((res) => setBlogs(res.data.data))
  }, [])

  const MyBlog_blogContainerStyle = {
    maxWidth: '690px',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10rem',
  };

  const MyBlog_commentStyle = {
    width: '100%',
    lineHeight: '1.4',
    borderRadius: '15px',
    margin: '1rem 0',
    padding: '1.0rem 1rem',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
  };

  const MyBlog_commentBodyStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const MyBlog_commentBodyImgStyle = {
    maxWidth: '100px',
    borderRadius: '50%',
  };

  const MyBlog_commentContentStyle = {
    marginLeft: '1rem',
    color: '#3a3a3a',
  };

  const MyBlog_commentContentH2Style = {
    fontSize: '1.4rem',
    color: '#3a3a3a',
    marginBottom: '0.2rem',
  };

  const MyBlog_commentContentPStyle = {
    fontSize: '1rem',
    color: '#000',
  };

  const MyBlog_commentContentNameStyle = {
    fontSize: '1.0rem',
    color: '#228B22',
    marginBottom: '0.2rem',
  };

  return (
    <div style={MyBlog_blogContainerStyle}>

      {blogs.map((blog) => (
        <div key={blog.title} style={MyBlog_commentStyle} className="MyBlog_comment">
          <div style={MyBlog_commentBodyStyle} className="MyBlog_commentBody">

            <a href="#" className="user">
              <img src={blog.authorAvatar} alt="" style={MyBlog_commentBodyImgStyle} className="userPfp" />
            </a>

            <div style={MyBlog_commentContentStyle} className="MyBlog_comment_content">
              <h3 style={MyBlog_commentContentNameStyle} className="MyBlog_username">{blog.authorName}</h3>
              <h2 style={MyBlog_commentContentH2Style}>{blog.title}</h2>
              <p style={MyBlog_commentContentPStyle}>{blog.content}</p>
            </div>

          </div>
        </div>
      ))}

    </div>
  );
};

export default BlogList;
