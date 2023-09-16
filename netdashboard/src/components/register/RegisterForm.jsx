import React, {useRef, useState} from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BsFacebook, BsGoogle } from "react-icons/bs"

export default function RegisterForm() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const dobRef = useRef()
    const degreeLevelRef = useRef()
    const { registerUser, loginOrRegisterWithGoogle, loginOrRegisterWithFacebook } = useAuth()
    const [error, setError] = useState()
    const navigate = useNavigate()

    // Register handlers
    const handleRegister = async (e) => {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password does not match")
        }

        if(!dobRef.current.value || !emailRef.current.value || !passwordRef.current.value || !passwordConfirmRef.current.value 
            || !firstNameRef.current.value || !lastNameRef.current.value || !degreeLevelRef.current.value) {
            return setError("Email, Date of birth, password, first name, last name and degree cannot be empty!")
        }

        if(degreeLevelRef.current.value === "Choose degree level") {
            return setError("Can't pick this option!")
        }

        try {
            setError("")
            await registerUser(
                emailRef.current.value,
                dobRef.current.value, 
                passwordRef.current.value, 
                firstNameRef.current.value, 
                lastNameRef.current.value, 
                degreeLevelRef.current.value
            )
            navigate('/')
        }
        catch(error) {
            return setError(error.message)
        }
    }

    const handleGoogleRegister = async () => {
        try {
            await loginOrRegisterWithGoogle()
            navigate('/')
        }
        catch(error) {
            return setError(error.message)
        }
    }

    const handleFacebookRegister = async () => {
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
            <h2 className="pb-2 fw-light text-center">Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <p>* equals required field</p>
            <Form onSubmit={handleRegister}>
                <Form.Group controlId="registerFirstName" className="pb-2">
                    <Form.Label>Name*</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" ref={firstNameRef} />
                </Form.Group>
                <Form.Group controlId="registerLastName" className="pb-2">
                    <Form.Control type="text" placeholder="Enter last name" ref={lastNameRef} />
                </Form.Group>
                <Form.Group controlId="registerEmail" className="pb-2">
                    <Form.Label>Email*</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" ref={emailRef} />
                </Form.Group>
                <Form.Group controlId="registerDateOfBirth" className="pb-2">
                    <Form.Label>Date of birth*</Form.Label>
                    <Form.Control type="date" placeholder="Enter date of birth" ref={dobRef} />
                </Form.Group>
                <Form.Group controlId="registerPassword" className="pb-3">
                    <Form.Label>Password*</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" ref={passwordRef} />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="pb-3">
                    <Form.Label>Confirm Password*</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" ref={passwordConfirmRef} />
                </Form.Group>
                <Form.Group controlId="selectDegree" className="pb-3">
                <Form.Label>Degree*</Form.Label>
                <Form.Select ref={degreeLevelRef}>
                    <option>Choose degree level</option>
                    <option>Bachelor</option>
                    <option>Master</option>
                    <option>PhD</option>
                </Form.Select>
                </Form.Group>
                <Button variant="success" className="bg-tri w-100 mb-2" type="submit">Register</Button>
                <p className="text-center mt-2">You can also register with a google or facebook account!</p>
                <Button variant="outline-danger" className="w-100 mb-2" onClick={handleGoogleRegister}><BsGoogle /> google</Button><br />
                <Button variant="primary" className="w-100" onClick={handleFacebookRegister}><BsFacebook /> Facebook</Button>
            </Form>
            </Card>
            <div className="text-center w-100 mb-3">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}