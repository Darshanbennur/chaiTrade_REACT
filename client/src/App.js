import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled from 'styled-components';
import axios from "./api/axiosConfig.js";
import { setUserDetails, setLoggedIn, setPremium, setMentor } from "./redux/userSlice.js";
import { useDispatch } from "react-redux";
import store from "./redux/store.js"
import { persistStore } from 'redux-persist';

//All CSS : 
import "../src/styles/app.css"
import { useEffect } from "react";

//All Pages : 
import Navbar from "../src/components/Navbar"
import Home from "./pages/Home/Home"
import Login_mainPage from "./pages/Authentication/Login_mainPage";
import ProfileComponent from "./pages/ProfilePage/ProfileComponent";
import NewsSection from "./pages/News/NewsSection.js";
import Charts_main from "./pages/Chart/Charts_main.jsx"
import BlogPage from "./pages/Blogs/BlogPage_main";
import MentorPanel from "./pages/MentorPanel/MentorPanel";
import Featured_main from "./pages/Featured/Featured_main";
import MentorBlogMain from "./pages/MentorBlogs/MentorBlogs_main"
import TransactionPage from "./pages/Transaction/TransactionPage.js";
import AboutUs from "./pages/AboutUS/about.jsx";
import FAQPage from "./pages/FAQ/MarketTerm.jsx";
import PricingPage from "./pages/Pricing/pricing.jsx";
import Footer from "./components/Footer"
import MentorApplicationMain from "./pages/MentorApplication/MentorApplication_main.jsx";

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
      console.log("Logged OUt!!");
      persistStore(store).purge();
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
              <Route path="/charts" element={<Charts_main />}></Route>
              <Route path="/news" element={<NewsSection />}></Route>
              <Route path="/blogs" element={<BlogPage />}></Route>
              <Route path="/mentorApplication" element={<MentorApplicationMain />}></Route>
              <Route path="/mentorPanel" element={<MentorPanel />}></Route>
              <Route path="/featured" element={<Featured_main />}></Route>
              <Route path="/myMentorBlogs" element={<MentorBlogMain />}></Route>
              <Route path="/transactions" element={<TransactionPage />}></Route>
              <Route path="/profile" element={<ProfileComponent />}></Route>
              <Route path="/faq" element={<FAQPage />}></Route>
              <Route path="/pricing" element={<PricingPage />}></Route>
              <Route path="/aboutUs" element={<AboutUs />}></Route>
            </Route>
          </Routes>
        </main>
        {/* <Footer /> */}
      </BrowserRouter>

    </Container>
  );
}

export default App;