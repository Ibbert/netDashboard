import React from "react";
import { Container } from "react-bootstrap";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
    return (
        <Container fluid className="bg-main d-flex align-items-center justify-content-center min-vh-100">
            <div className="w-100 mx-auto" style={{maxWidth: '400px'}}>
                <RegisterForm />
            </div>
        </Container>
    )
}