import { addDoc, collection } from "firebase/firestore";
import React, {useRef, useState} from "react";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import DateObject from "react-date-object";

export default function InputHoursForm() {
    const hoursRef = useRef()
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const {currentUser} = useAuth()
    const currentDate = new DateObject()
    const dateTime = currentDate.format("YYYY/MM/DD HH:mm")

    const handleInputHours = async (e) => {
        e.preventDefault()
        const hours = hoursRef.current.value

        if(hours > 45) {
           return setError("You can't log more than 45 hours!") 
        }

        try {
            setError("")
            const loggedHoursColRef = collection(db, 'users', currentUser.uid, 'loggedHours') 
            await addDoc(loggedHoursColRef, {
                hours: hours,
                date: `${dateTime}`
            })
            setMessage("Succsessfully added " + hours + ' hours!')
        }
        catch(error) {
            setError(error.message)
        }
    }

    return (
        <Form onSubmit={handleInputHours} className="m-2">
            <Row>
                <Row>
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Label>You can log hours!</Form.Label>
                </Row>
            <Col xs>
                <Form.Group controlId="inputHoursForm">
                    <Form.Control type="text" placeholder="Enter hours" ref={hoursRef} />
                </Form.Group>
            </Col>
            <Col xs>
                <Button variant="success" className="bg-tri" type="submit">Add hours</Button>
            </Col>
            </Row>
        </Form>
    )
}