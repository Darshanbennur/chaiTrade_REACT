import React, { useState } from "react";
import * as Components from '../Authentication/Component.jsx';
import axios from "../../api/axiosConfig.js"
import { loginSuccess, setLoggedIn, setPremium, setMentor } from "../../redux/userSlice.js"

import videoBG from "../../images/incease_stock_2.mov"
import logoImg from "../../images/logo.png"
import styles from "../Authentication/login_mainPage.module.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login_mainPage() {
    const [signIn, toggle] = React.useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: ""
    })

    const [userRegisterData, setUserRegisterData] = useState({
        userName: "",
        email: "",
        password: ""
    })

    function handleRegisterChange(event) {
        setUserRegisterData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function onRegisterSubmit(event) {
        event.preventDefault()
        //  route : /registerUser
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
        const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

        if (!userRegisterData.userName || !userRegisterData.email || !userRegisterData.password)
            alert("Fields can't be empty!!")
        else if (!userRegisterData.email.match(mailformat))
            alert("Invalid Email Format!!")
        else if (!userRegisterData.password.match(passwordFormat))
            alert("Invalid Password Format!!")
        else {
            try {
                const result = await axios.post('/user/registerUser', userRegisterData)
                console.log(result.status)
                console.log(result.custom)
                if (result.status === 200) {
                    console.log("User Registered Successfully!!")
                    console.log(result.userDetails)
                    window.location.href = '/login';
                }
                else
                    console.log(result.custom)
            } catch (e) {
                console.error("Error during login:", e);
                alert("Invalid Credentials!!")
            }
        }
    }

    function handleChange(event) {
        setUserLoginData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function onLoginHandle(event) {
        event.preventDefault()
        try {
            const res = await axios.post('/user/login', userLoginData);
            if (res.status === 200) {
                console.log(res.status)
                dispatch(loginSuccess(res.data.user));
                dispatch(setLoggedIn(true));
                if (res.data.user.isPremium)
                    dispatch(setPremium(true));
                if (res.data.user.isMentor)
                    dispatch(setMentor(true));
                navigate("/")
            }
            else if (res.status === 401) {
                console.log("Invalid!!!!!!!!!!!!!!!1")
                alert("Invalid Credentials!!")
            }
        } catch (e) {
            console.error("Error during login:", e);
            alert("Invalid Credentials!!")
        }
    }

    return (
        <div style={{ backgroundColor: "black" }}>
            <div className={styles.vid}>
                <video className={styles.login_video} src={videoBG} autoPlay loop muted />
            </div>
            <Components.Container style={{ top: "25%", left: "25%", position: "absolute", opacity: "0.9" }}>
                <Components.SignUpContainer signinIn={signIn}>

                    <Components.Form onSubmit={onRegisterSubmit}>
                        <Components.Title><span style={{fontSize : "25px"}}>Create Account</span></Components.Title>
                        <img src={logoImg} alt="home-logo" style={{ width: "100px", height: "100px" }} />

                        <Components.Input
                            name="userName"
                            value={userRegisterData.userName}
                            onChange={handleRegisterChange}
                            type='text'
                            placeholder='Name' />

                        <Components.Input
                            name="email"
                            value={userRegisterData.email}
                            onChange={handleRegisterChange}
                            type='email'
                            placeholder='Email' />

                        <Components.Input
                            name="password"
                            value={userRegisterData.password}
                            onChange={handleRegisterChange}
                            type='password'
                            placeholder='Password' />

                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>

                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={onLoginHandle}>
                        <Components.Title><span style={{fontSize : "25px"}}>Sign in</span></Components.Title>
                        <img src={logoImg} alt="home-logo" style={{ width: "100px", height: "100px" }} />

                        <Components.Input
                            value={userLoginData.email}
                            onChange={handleChange}
                            type='email'
                            placeholder='Email'
                            name="email" />

                        <Components.Input
                            value={userLoginData.password}
                            onChange={handleChange}
                            type='password'
                            placeholder='Password'
                            name="password" />

                        <Components.Anchor href='#'>Forgot password? <span style={{ color: "purple" }}>Contact US</span></Components.Anchor>

                        <Components.Button type="submit" >Sigin In</Components.Button>

                    </Components.Form>
                </Components.SignInContainer>

                <Components.OverlayContainer signinIn={signIn}>
                    <Components.Overlay signinIn={signIn}>

                        <Components.LeftOverlayPanel signinIn={signIn}>
                            <Components.Title><span style={{fontSize : "25px"}}>Welcome to</span></Components.Title>
                            <Components.Title><span style={{ marginTop: "10px", color: "rgb(28, 91, 86)", fontSize: "22px" }}>Chai Trade!!</span></Components.Title>
                            <Components.Paragraph>
                                Making it seem as easy as making tea.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title><span style={{fontSize : "25px"}}>Welcome to</span></Components.Title>
                            <Components.Title><span style={{ marginTop: "10px", color: "rgb(28, 91, 86)", fontSize: "22px" }}>Chai Trade!!</span></Components.Title>
                            <Components.Paragraph>
                                Making it seem as easy as making tea.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Sigin Up
                            </Components.GhostButton>
                        </Components.RightOverlayPanel>

                    </Components.Overlay>
                </Components.OverlayContainer>

            </Components.Container>
        </div>

    );
}