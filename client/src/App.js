import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import axios from "./api/axiosConfig"
import Footer from "./components/Footer"
import { loginSuccess, setLoggedIn, setPremium, setMentor  } from "./redux/userSlice"

//All Pages : 
import Navbar from "../src/components/Navbar"
import Home from "./pages/Home/Home"
import Login_mainPage from "./pages/Authentication/Login_mainPage";
import ProfileComponent from "./pages/ProfilePage/ProfileComponent";
import BlogPage from "./pages/Blogs/BlogPage_main";

//All CSS : 
import "../src/styles/app.css"
import { useEffect } from "react";
import Featured_main from "./pages/Featured/Featured_main";

const Container = styled.div`
  padding: 0;
  margin: 0;
`

function App() {
  const dispatch = useDispatch();

  const handler = async () => {
    const user = await axios.get('/user/checkCookie');
    if (user.data.custom === "true") {
      dispatch(loginSuccess(user.data.userData));
      dispatch(setLoggedIn(true));
      if (user.data.userData.isPremium)
        dispatch(setPremium(true));
      if (user.data.userData.isMentor)
        dispatch(setMentor(true));
    }
    else{
      dispatch(setLoggedIn(false));
      dispatch(setPremium(false));
      dispatch(setMentor(false));
    }
  }

  useEffect(() => {
    handler();
  }, [])

  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/">
              <Route index element={<Home />}></Route>
              <Route path="/login" element={<Login_mainPage />}></Route>
              <Route path="/blogs" element={<BlogPage />}></Route>
              <Route path="/featured" element={<Featured_main />}></Route>
              <Route path="/profile" element={<ProfileComponent />}></Route>
            </Route>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>

    </Container>
  );
}

export default App;