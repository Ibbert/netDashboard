import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { BsGrid1X2Fill, BsBookFill, BsPersonCircle } from "react-icons/bs";


export default function SidebarNav() {
    // changes end margin on all icons in sidebar nav
    const marginIcons = "me-2"

    return (
        <Nav className="flex-column mb-2">
                <Nav.Item className="bg-main m-1 mx-2 rounded">
                    <Nav.Link to='/' as={RouterLink} className="text-dark">
                        <div className="px-2">
                           <BsGrid1X2Fill className={marginIcons}/> Dashboard
                        </div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="bg-main m-1 mx-2 rounded">
                    <Nav.Link to='/logbook' as={RouterLink} className="text-dark">
                        <div className="px-2">
                            <BsBookFill className={marginIcons}/> Logbook
                        </div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item className="bg-main m-1 mx-2 rounded">
                    <Nav.Link to='/profile' as={RouterLink} className="text-dark">
                        <div className="px-2">
                            <BsPersonCircle className={marginIcons}/> Profile
                        </div>
                    </Nav.Link>
                </Nav.Item>
        </Nav>
    )
}