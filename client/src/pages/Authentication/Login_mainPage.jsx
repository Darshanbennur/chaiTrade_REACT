import React, { useState } from "react";
import * as Components from '../Authentication/Component.jsx';
import axios from "../../api/axiosConfig.js"
import { loginSuccess } from "../../redux/userSlice.js"


import videoBG from "../../images/incease_stock_2.mov"
import logoImg from "../../images/logo.png"
import styles from "../Authentication/login_mainPage.module.css"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Login_mainPage() {
    const [signIn, toggle] = React.useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userLoginData, setUserLoginData] = useState(
        { email: "", password: "" }
    )

    function handleChange(event) {
        setUserLoginData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const res = await axios.post('/user/login', userLoginData);
            if (res.status == 200) {
                console.log(res.status)
                dispatch(loginSuccess(res.data.user.userName));
                navigate("/")   
            }
            else if (res.status == 401) {
                console.log("Invalid!!!!!!!!!!!!!!!1")
                alert("Invalid Credentials!!")
            }
        } catch(e){
            console.error("Error during login:", e);
            alert("Invalid Credentials!!")
        }
        
    }

    return (
        <div>
            <div className={styles.vid}>
                <video className={styles.login_video} src={videoBG} autoPlay loop muted />
            </div>
            <Components.Container style={{ top: "25%", left: "25%", position: "absolute", opacity: "0.9" }}>
                <Components.SignUpContainer signinIn={signIn}>

                    <Components.Form>
                        <Components.Title>Create Account</Components.Title>
                        <img src={logoImg} style={{ width: "100px", height: "100px" }} />

                        <Components.Input
                            type='text'
                            placeholder='Name' />

                        <Components.Input
                            type='email'
                            placeholder='Email' />

                        <Components.Input
                            type='password'
                            placeholder='Password' />

                        <Components.Button>Sign Up</Components.Button>
                    </Components.Form>

                </Components.SignUpContainer>

                <Components.SignInContainer signinIn={signIn}>
                    <Components.Form onSubmit={handleSubmit}>
                        <Components.Title>Sign in</Components.Title>
                        <img src={logoImg} style={{ width: "100px", height: "100px" }} />

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
                            <Components.Title>Welcome to</Components.Title>
                            <Components.Title><span style={{ marginTop: "10px", color: "rgb(28, 91, 86)", fontSize: "25px" }}>Chai Trade!!</span></Components.Title>
                            <Components.Paragraph>
                                Making it seem as easy as making tea.
                            </Components.Paragraph>
                            <Components.GhostButton onClick={() => toggle(true)}>
                                Sign In
                            </Components.GhostButton>
                        </Components.LeftOverlayPanel>

                        <Components.RightOverlayPanel signinIn={signIn}>
                            <Components.Title>Welcome to</Components.Title>
                            <Components.Title><span style={{ marginTop: "10px", color: "rgb(28, 91, 86)", fontSize: "25px" }}>Chai Trade!!</span></Components.Title>
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