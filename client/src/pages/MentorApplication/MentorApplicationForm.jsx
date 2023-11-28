import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../api/axiosConfig.js"

export default function MentorApplicationForm() {
  const mentorCardStyle = {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    margin: "50px auto",
    padding: "30px",
    width: "80%",
    maxWidth: "600px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "10px",
    fontWeight: "bold",
    position: "relative",
  };

  const requiredAsteriskStyle = {
    color: "red",
    marginRight: "5px",
    fontWeight: "bold",
    fontSize: "1.2em",
    position: "absolute",
    top: "0",
    left: "-15px",
  };

  const inputStyle = {
    borderRadius: "3px",
    border: "1px solid #c9b1b1",
    fontSize: "16px",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    color: "#000",
  };

  const selectStyle = {
    borderRadius: "3px",
    border: "1px solid #c9b1b1",
    fontSize: "16px",
    marginBottom: "10px",
    padding: "10px",
    width: "100%",
    color: "#000",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundSize: "15px 15px",
    paddingRight: "20px",
    cursor: "pointer",
  };

  const textareaStyle = {
    borderRadius: "3px",
    border: "1px solid #c9b1b1",
    fontSize: "16px",
    marginBottom: "10px",
    padding: "10px",
    width: "98%",
    color: "#000",
    height: "150px",
  };

  const submitButtonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
    padding: "10px 20px",
    width: "40%",
    marginLeft: "145px",
    marginTop: "20px",
    borderRadius: "5px",
  };

  const FullbodyStyle = {
    backgroundcolor: "#f2f2f2",
    fontfamily: "Arial, sans-serif",
    fontsize: "16px",
    lineheight: "1.5",
    margin: 0,
    padding: 0,
    height: "840px",
    color: " #fff",
  };

  const charCountStyle = {
    display: "block",
    fontSize: "14px",
    float: "right",
  };

  const strategyBlockStyle = {
    marginTop: "20px",
    marginBottom: "20px",
  };

  const descriptionStyle = {
    marginBottom: "20px",
  };

  const reduxUserData = useSelector((state) => state.userData)

  const [userData, setUserData] = useState({
    userID: reduxUserData.currentUser._id,
    userName: reduxUserData.currentUser.userName,
    email: reduxUserData.currentUser.email,
    country: "",
    tradingExperience: "",
    tradingStrategy: "",
    reasonMentor: "",
    certificationPath: ""
  })

  function handleChanges(event) {
    setUserData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value.slice(0, 200)
      }
    })
  }

  function handleMentorApplicationSubmit(event) {
    event.preventDefault();
    const regexPattern = /^(https?:\/\/)/i;
    if (!userData.tradingExperience || !userData.tradingStrategy || !userData.certificationPath) {
      toast.error("🥲 Fields can't be empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if(!regexPattern.test(userData.certificationPath)){
      toast.error("🥲 Doesn't resemble as a link", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      try {
        axios.post('/mentor/postMentorApplication', userData)
        toast.success("🥳 Application sent!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUserData({
          userID: reduxUserData.currentUser._id,
          userName: reduxUserData.currentUser.userName,
          email: reduxUserData.currentUser.email,
          country: "",
          tradingExperience: "",
          tradingStrategy: "",
          reasonMentor: "",
          certificationPath: ""
        })
      }
      catch (error) {
        toast.error("🥲 Error in posting the application", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }


    }
  }

  return (
    <>
      <div style={FullbodyStyle}>
        <div className="mentor_card" style={mentorCardStyle}>
          <form id="mentorApplication" onSubmit={handleMentorApplicationSubmit}>
            <label style={labelStyle} required>
              <span style={requiredAsteriskStyle}>*</span>Country
            </label>

            <select
              id="mentor_country"
              name="country"
              value={userData.country}
              style={selectStyle}
              onChange={handleChanges}
              required
            >
              <option value="">--Select your country--</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
              <option value="Japan">Japan</option>
              <option value="South Korea">South Korea</option>
              <option value="Australia">Australia</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="mentor_experience" style={labelStyle} required>
              <span style={requiredAsteriskStyle}>*</span>Trading Experience (in
              years)
            </label>

            <select
              id="mentor_experience"
              name="tradingExperience"
              value={userData.tradingExperience}
              style={selectStyle}
              onChange={handleChanges}
              required
            >
              <option value="">--Select your trading experience--</option>
              <option value=">1 year">Greater than 1 year</option>
              <option value=">2 year">Greater than 2 years</option>
              <option value=">3 year">Greater than 3 years</option>
              <option value=">4 year">Greater than 4 years</option>
              <option value=">5 year">Greater than 5 years</option>
              <option value=">6 year">Greater than 6 years</option>
              <option value=">7 year">Greater than 7 years</option>
              <option value=">8 year">Greater than 8 years</option>
              <option value=">9 year">Greater than 9 years</option>
              <option value=">10 year">Greater than 10 years</option>
            </select>

            <div className="mentor_strategyblock" style={strategyBlockStyle}>

              <label htmlFor="strategy" style={labelStyle} required>
                <span style={requiredAsteriskStyle}>*</span>Mention any one trading strategy
              </label>

              <textarea
                type="text"
                id="strategy"
                name="tradingStrategy"
                value={userData.tradingStrategy}
                style={textareaStyle}
                onChange={handleChanges}
              ></textarea>

              <span
                id="strategy-char-count"
                className="mentorchar_count mentorchar_count1"
                style={charCountStyle}
              >
                {userData.tradingStrategy.length}/200
              </span>
            </div>

            <div className="mentor_description" style={descriptionStyle}>

              <label htmlFor="why" style={labelStyle} required>
                <span style={requiredAsteriskStyle}>*</span>Why do you want to be
                a mentor?
              </label>

              <textarea
                id="why"
                name="reasonMentor"
                value={userData.reasonMentor}
                style={textareaStyle}
                onChange={handleChanges}
              ></textarea>

              <span
                id="why-char-count"
                className="mentorchar_count"
                style={charCountStyle}
              >
                {userData.reasonMentor.length}/200
              </span>
            </div>

            <label htmlFor="certificate" style={labelStyle} required>
              <span style={requiredAsteriskStyle}>*</span>Certificate / Qualification (Upload a Drive Link : )
            </label>

            <input
              type="text"
              id="certificate"
              name="certificationPath"
              value={userData.certificationPath}
              style={inputStyle}
              onChange={handleChanges}
            />

            <input type="submit" value="Submit" style={submitButtonStyle} />
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}
