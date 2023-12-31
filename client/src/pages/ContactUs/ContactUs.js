import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

import styles from './contactUs.module.css';
import charts from "../../images/charts.jpg"
import axios from "../../api/axiosConfig.js"
import Footer from '../../components/Footer.jsx';

export default function ContactUs() {

  const reduxUserData = useSelector((state) => state.userData)
  const [contactData, setContactData] = useState({
    authorName: reduxUserData.currentUser.userName,
    email: reduxUserData.currentUser.email,
    title: "",
    content: ""
  })

  function handleContactFormChanges(event) {
    setContactData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
    if (!contactData.authorName || !contactData.email || !contactData.title || !contactData.content) {
      toast.error("🥲 Fields can't be empty!!", {
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
    if (!contactData.email.match(mailformat)) {
      toast.error("🥲 Invalid email format", {
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
        axios.post('/util/postContactUs', contactData)
        toast.success("🥳 Query posted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setContactData({
          authorName: reduxUserData.currentUser.userName,
          email: reduxUserData.currentUser.email,
          title: "",
          content: ""
        })
      }
      catch (error) {
        toast.error("🥲 Error in Submitting Query", {
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
      <div>
        <img src={charts} alt="background" className={styles.backgroundpic} />
        <div className={styles.container}>
          <div className={styles['contact-info']}>
            <h3>Contact Us</h3>
            <h4>We are open to suggestions:</h4>
            <p>☎️  : +91-7907314057</p>
            <p>📜: IIIT Sri City</p>
            <p>📬: admin@chaitrade.com</p>
          </div>

          <div className={styles['contact-form']}>
            <h2>Get in touch</h2>
            <form id="contact-form" style={{ marginTop: "-40px" }} onSubmit={handleFormSubmit}>
              <div className={styles['form-group-inline']}>
                <label className={styles.forLabel} htmlFor="name">Name:</label>
                <input
                  className={styles['custom-input']}
                  type="text"
                  id="name"
                  name="authorName"
                  value={contactData.authorName}
                  onChange={handleContactFormChanges}
                  required
                />
              </div>

              <div className={styles['form-group-inline']}>
                <label className={styles.forLabel} htmlFor="email">Email:</label>
                <input
                  className={styles['custom-input']}
                  type="email"
                  id="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleContactFormChanges}
                  required
                />
              </div>

              <div className={styles['form-group-full']}>
                <label className={styles.forLabel} htmlFor="title">Title:</label>
                <input
                  className={styles['custom-input']}
                  type="text"
                  id="title"
                  name="title"
                  value={contactData.title}
                  onChange={handleContactFormChanges}
                  required
                />
              </div>

              <div className={styles['form-group-full']}>
                <label className={styles.forLabel} htmlFor="content">Message:</label>
                <textarea
                  className={styles['custom-input']}
                  id="content"
                  name="content"
                  value={contactData.content}
                  onChange={handleContactFormChanges}
                  required
                ></textarea>
              </div>

              <input
                type="submit"
                className={`${styles['custom-input']} ${styles['submit-button']}`}
              />

            </form>
          </div>
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
      <Footer />
    </>
  );
};