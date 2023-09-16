import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import NoContentHere from "./components/dashboard/NoContentHere";
import LogbookPage from "./components/logbook/LogbookPage";
import LoginPage from "./components/login/LoginPage";
import Navbar from "./components/nav/navbar/Navbar";
import Sidebar from "./components/nav/sidebar/Sidebar";
import ProfilePage from "./components/profile/ProfilePage";
import RegisterPage from "./components/register/RegisterPage";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const {currentUser} = useAuth()
  let isLoggedIn = useState(true)
  // breakpoint sm(small): 768px
  const [isMobile, setMobile] = useState(window.innerWidth < 1100);
  const updateMedia = () => {
    setMobile(window.innerWidth < 1100);
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if(!currentUser) {
      isLoggedIn = false
  }

  return (
    <Container fluid className="p-0">
    { isLoggedIn ? 
      <Row className="p-0 m-0">
      { isMobile ? <Navbar /> : <Sidebar /> }
        <Col className="p-0">
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/logbook' element={<LogbookPage />}/>
            <Route path='/profile' element={<ProfilePage />}/>
            <Route path="*" element={<NoContentHere />} />
          </Routes>
        </Col>
      </Row> 
     :
     <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NoContentHere />} />
      </Routes>
     }
    </Container>
  );
}