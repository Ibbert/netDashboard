import React from "react";
import { Container } from "react-bootstrap";
import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <Container fluid className="bg-main d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100 mx-auto" style={{maxWidth: '400px'}}>
                <LoginForm />
            </div>
        </Container>
    )
}