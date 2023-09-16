import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Button, Container } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";
import SidebarNav from "./SidebarNav";

export default function Sidebar() {
    const {logout, currentUser} = useAuth()
    const navigate = useNavigate()
    let isLoggedIn = useState(true);
    
    if(!currentUser) {
        isLoggedIn = false;
    }
    
    const handleLogout = () => {
        try {
            logout()
            navigate('/login')
        }
        catch(error) {
            console.log(error);
        }
    }

    const handleLoginBtn = () => {
        navigate('/login')
    }

    return (
        <Col sm={2} className="p-0">
        <Container className="bg-second min-vh-100 p-0">
            <div className="d-flex">
               <div className="text-dark fw-bold p-3 m-auto">
                   netDashboard
                </div>
            </div>
            <SidebarNav />
            <div className="d-flex">
            { isLoggedIn ? 
                <Button size="sm" className="mx-auto" variant="dark" onClick={handleLogout}>Logout</Button> :
                <Button size="sm" className="mx-auto" variant="dark" onClick={handleLoginBtn}>Login</Button> 
            }
            </div>
        </Container>
        </Col>
    )
}