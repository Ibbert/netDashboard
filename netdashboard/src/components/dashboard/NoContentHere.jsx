import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function NoContentHere() {
    const {currentUser} = useAuth()
    let isLoggedIn = useState(true)

    if(!currentUser) {
        isLoggedIn = false
    }

    return (
        <Container fluid className="bg-main d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100 mx-auto">
                <div className="display-6 text-center pb-2">There's nothing here!</div>
                { isLoggedIn ? 
                    <div className="text-center w-100"> 
                        Take me <Link to="/">home</Link>
                    </div> 
                : 
                    <div className="text-center w-100">
                        Take me to <Link to="/login">login</Link> 
                    </div>
                }
            </div>
        </Container>
    )
}