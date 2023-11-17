import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled from 'styled-components';
import Footer from "./components/Footer"

//All Pages : 
import Navbar from "../src/components/Navbar"
import Home from "./pages/Home/Home"
import Login_mainPage from "./pages/Authentication/Login_mainPage";
import ProfileComponent from "./pages/ProfilePage/ProfileComponent";
import BlogPage from "./pages/Blogs/BlogPage_main";
import Featured_main from "./pages/Featured/Featured_main";
import MentorPanel from "./pages/MentorPanel/MentorPanel";
import MentorBlogMain from "./pages/MentorBlogs/MentorBlogs_main"

//All CSS : 
import "../src/styles/app.css"

const Container = styled.div`
  padding: 0;
  margin: 0;
`

function App() {
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