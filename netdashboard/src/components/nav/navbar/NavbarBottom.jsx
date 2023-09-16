import React from "react";
import { Nav, Navbar as NavBar } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { BsGrid1X2Fill, BsBookFill, BsPersonCircle } from "react-icons/bs";

export default function NavbarBottom() {
    // Changes the Nav link icons size
    const iconSize = 25;

    return (
        <NavBar fixed="bottom" className="bg-second p-0">
            <Nav className="mx-auto">
                <Nav.Item>
                    <Nav.Link to="/" as={RouterLink}>
                        <BsGrid1X2Fill size={iconSize} className="m-2" />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to="/logbook" as={RouterLink}>
                        <BsBookFill size={iconSize} className="m-2" />
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link to="/profile" as={RouterLink}>
                        <BsPersonCircle size={iconSize} className="m-2" />
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </NavBar>
    );
}