import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axiosConfig.js";
import image from "../../images/charts.jpg";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Panel_appContainerStyle = {
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    zIndex: 1,
};

const Panel_backgroundPicStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    objectFit: 'cover',
};

const Panel_containerStyle = {
    maxWidth: '700px',
    width: '100%',
    padding: '1rem',
    margin: '0 auto',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    zIndex: 1,
};

const Panel_uploadStyle = {
    borderRadius: '12px',
    background: '#f9f9f9',
    padding: '25px',
    margin: '2rem 0',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.24)',
};

const Panel_inputTextStyle = {
    borderRadius: '8px',
    width: '95%',
    fontSize: '0.9rem',
    border: '1px solid #ccc',
    background: '#fff',
    padding: '12px',
    margin: '0.5rem 0',
};

const Panel_textareaStyle = {
    height: '120px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    border: '1px solid #ccc',
    padding: '12px',
    width: '590px',
};

const Panel_submitButtonStyle = {
    cursor: 'pointer',
    width: '100%',
    border: 'none',
    background: '#4caf50',
    color: '#fff',
    margin: '0.5rem 0 0 0',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease-in-out',
};

const Panel_focusStyle = {
    outline: '0',
    border: '2px solid #72ac99',
};

export default function MentorPanel() {
    const reduxUserData = useSelector((state) => state.userData)
    const initialUserData = reduxUserData.currentUser;

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        mentorID: initialUserData._id,
        mentorEmail: initialUserData.email,
        mentorName: initialUserData.userName,
        mentorImage: initialUserData.profileImage,
        title: "",
        content: "",
        arrayID: initialUserData.arrayID
    })

    useEffect(() => {
        setUserData({
            mentorID: initialUserData._id,
            mentorEmail: initialUserData.email,
            mentorName: initialUserData.userName,
            mentorImage: initialUserData.profileImage,
            title: "",
            content: "",
            arrayID: initialUserData.arrayID
        });
        if (reduxUserData.isUserloggedIn === false) {
            navigate('/login');
        }
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        if (!userData.title || !userData.content) {
            alert("Fields can't be Empty");
        }
        else {
            console.log(userData)
            const result = await axios.post('/mentor/postMentorBlog', userData)
            console.log(result.status)
            if (result.status === 200) {
                toast.success('📜 Blog Posted!!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setUserData({
                    mentorID: initialUserData._id,
                    mentorEmail: initialUserData.email,
                    mentorName: initialUserData.userName,
                    mentorImage: initialUserData.profileImage,
                    title: "",
                    content: "",
                    arrayID: initialUserData.arrayID
                })
            }
            else {
                alert("Error in Posting the Featured Blog!!")
            }
        }
    }

    function handleInputChange(event) {
        setUserData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }

        })
    }

    return (
        <>
            <div style={Panel_appContainerStyle}>
                <img src={image} style={Panel_backgroundPicStyle} alt="background" />
                <div style={Panel_containerStyle}>
                    <form id="comment_upload" onSubmit={handleSubmit} style={Panel_uploadStyle}>
                        <div className="icons">
                            <h3>Mentor Panel Blog Section</h3>
                        </div>

                        <input
                            name="title"
                            id="title"
                            placeholder="Title of the blog..."
                            type="text"
                            value={userData.title}
                            onChange={handleInputChange}
                            style={Panel_inputTextStyle}
                        />

                        <textarea
                            name="content"
                            id="content"
                            placeholder="Type your message here...."
                            value={userData.content}
                            onChange={handleInputChange}
                            style={Panel_textareaStyle}
                        />

                        <button
                            name="submit"
                            type="submit"
                            id="contact-submit"
                            style={{ ...Panel_submitButtonStyle, ...Panel_focusStyle }}>Submit</button>

                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}