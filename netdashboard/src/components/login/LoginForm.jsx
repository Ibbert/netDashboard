import React, {useRef, useState} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BsFacebook, BsGoogle } from "react-icons/bs"

export default function LoginForm() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, loginOrRegisterWithGoogle, loginOrRegisterWithFacebook } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()


    // Login handlers
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
    
            setError("")
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        }
        catch(error) {
            return setError(error.message)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginOrRegisterWithGoogle()
            navigate('/')
        }
        catch(error) {
            return setError(error.message)
        }
    }

    const handleFacebookLogin = async () => {
        try {
            await loginOrRegisterWithFacebook()
            navigate('/')
        }
        catch(error) {
            return setError(error.message)
        }
    }

    return (
        <div>
            <Card className="bg-second p-4 m-2 shadow">
            <div className="mb text-center">Welcome to</div>
                <div className="display-6 fw-bold text-center mb-5">netDashboard</div>
            <h2 className="pb-2 fw-light text-center">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="loginEmail" className="pb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" ref={emailRef} />
                </Form.Group>
                <Form.Group controlId="loginPassword" className="pb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} />
                </Form.Group>
                <Button variant="success" className="bg-tri w-100 mb-2" type="submit">Login</Button>
                <p className="text-center mt-2">You can also login with a google or facebook account!</p>
                <Button variant="outline-danger" className="w-100 mb-2" onClick={handleGoogleLogin}><BsGoogle /> google</Button>
                <Button variant="primary" className="bg-blue w-100" onClick={handleFacebookLogin}><BsFacebook /> facebook</Button>
            </Form>
            </Card>
            <div className="text-center w-100">
                Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
    )
}