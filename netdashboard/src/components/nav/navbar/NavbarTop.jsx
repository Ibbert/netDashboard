import React, { useState } from "react";
import { Navbar, Offcanvas, Nav, Button } from "react-bootstrap";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { BsGrid1X2Fill, BsBarChartFill, BsBookFill, BsPersonCircle } from "react-icons/bs";

export default function NavbarTop() {
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

    // changes end margin on all icons in sidebar nav
    const marginIcons = "me-2"

    return (
        <Navbar sticky="top" className="bg-second p-0 navbar-light" expand={false}>
            <Navbar.Toggle aria-controls="OffcanvasBar" className="ms-3" />
            <div className="m-2">
                   Menu
            </div>
            <div className="fw-bold p-3 mx-auto">
                   netDashboard
            </div>
                <Navbar.Offcanvas 
                    id="OffcanvasBar" 
                    aria-labelledby="offcanvasNavbarLabel" 
                    placement="start"
                    className="bg-second"
                >
                    <Offcanvas.Header closeButton className="btn-close-dark">
                        <Offcanvas.Title 
                            id="offcanvasNavbarLabel" 
                        >   Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav className="flex-column mb-2">
                        <Nav.Item className="bg-main m-1 mx-2 rounded">
                            <Nav.Link to='/' as={RouterLink} className="text-dark">
                                <div className="px-3">
                                    <BsGrid1X2Fill className={marginIcons}/> Dashboard
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="bg-main m-1 mx-2 rounded">
                            <Nav.Link to='/logbook' as={RouterLink} className="text-dark">
                                <div className="px-3">
                                    <BsBookFill className={marginIcons}/> Logbook
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="bg-main m-1 mx-2 rounded">
                            <Nav.Link to='/profile' as={RouterLink} className="text-dark">
                                <div className="px-3">
                                    <BsPersonCircle className={marginIcons}/> Profile
                                </div>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className="d-flex">
                    { isLoggedIn ? 
                        <Button variant="dark" className="mx-auto" onClick={handleLogout}>Logout</Button> :
                        <Button variant="dark" className="mx-auto" onClick={handleLoginBtn}>Login</Button> 
                    }
                    </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
        </Navbar>
    );
}