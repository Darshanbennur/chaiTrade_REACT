import React from 'react';
import './NetworkError.css';
import { useNavigate } from "react-router-dom";

export default function NetworkError() {
  const navigate = useNavigate();

  return (
    <>
      <div className="error-container">
        <div className="error-symbol">
          <span className="line"></span>
          <span className="circle"></span>
          <span className="line"></span>
        </div>
        <h3>500 - Internal Server Error</h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "10px" }}>Oops! Something went wrong on our end. Please try again later. If the issue persists</p>
            <button
              style={{ padding: "8px", borderRadius: "3px", marginTop: "10px" }}
              onClick={() => {
                navigate('/ContactUs')
              }}
            >
              Contact Us
            </button>
          </div>
        </div>

      </div>
    </>
  );
};
