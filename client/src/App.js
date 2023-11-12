import { Routes, Route, BrowserRouter } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from "react-redux";

//All Pages : 
import Navbar from "../src/components/Navbar"
import Login_mainPage from "./pages/Authentication/Login_mainPage";
import Home from "./pages/Home/Home"
import axios from "./api/axiosConfig"
import { loginSuccess } from "./redux/userSlice"


//All CSS : 
import "../src/styles/app.css"
import { useEffect } from "react";

const Container = styled.div`
  padding: 0;
  margin: 0;
`

function App() {

  const dispatch = useDispatch();
  const handler = async () => {
    console.log("hello")
    const user = await axios.get('/user/checkCookie');
    if(user != "NULL"){
      console.log(user);
      dispatch(loginSuccess(user.data.userName));
    }
  }
  useEffect(() => {
    handler();
  }, [])

  return (    
    <Container>
      <Navbar/>
      <BrowserRouter>
        <main>
          <Routes>
              <Route path="/">
                <Route index element={<Home/>}></Route>
                <Route path="/login" element={<Login_mainPage/>}></Route>
              </Route>
          </Routes>
        </main>

      </BrowserRouter>

    </Container>
  );
}

export default App;