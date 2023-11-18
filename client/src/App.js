import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled from 'styled-components';
import axios from "./api/axiosConfig.js";
import { setUserDetails, setLoggedIn, setPremium, setMentor } from "./redux/userSlice.js";
import { useDispatch } from "react-redux";

//All Pages : 
import Navbar from "../src/components/Navbar"
import Home from "./pages/Home/Home"
import Login_mainPage from "./pages/Authentication/Login_mainPage";
import ProfileComponent from "./pages/ProfilePage/ProfileComponent";
import BlogPage from "./pages/Blogs/BlogPage_main";
import Featured_main from "./pages/Featured/Featured_main";
import MentorPanel from "./pages/MentorPanel/MentorPanel";
import MentorBlogMain from "./pages/MentorBlogs/MentorBlogs_main"
import Footer from "./components/Footer"

//All CSS : 
import "../src/styles/app.css"
import { useEffect } from "react";

const Container = styled.div`
  padding: 0;
  margin: 0;
`

function App() {

  const dispatch = useDispatch();

  async function getUser() {
    const user = await axios.get('/user/checkCookie');
    if (user.data.custom === "true") {
      dispatch(setUserDetails(user.data.userData));
      dispatch(setLoggedIn(true))
      if (user.data.userData.isMentor === true) {
        dispatch(setMentor(true))
      }
      if (user.data.userData.isPremium === true) {
        dispatch(setPremium(true))
      }
    }
    else {
      console.log("Logged OUt!!")
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/">
              <Route path="" element={<Home />}></Route>
              <Route path="/login" element={<Login_mainPage />}></Route>
              <Route path="/blogs" element={<BlogPage />}></Route>
              <Route path="/mentorPanel" element={<MentorPanel />}></Route>
              <Route path="/featured" element={<Featured_main />}></Route>
              <Route path="/myMentorBlogs" element={<MentorBlogMain />}></Route>
              <Route path="/profile" element={<ProfileComponent />}></Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>

    </Container>
  );
}

export default App;