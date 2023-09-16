import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

export default function ProfileEdit() {
  // Define variables and references
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const profileImageRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dateOfBirthRef = useRef();
  const degreeLevelRef = useRef();

  const [user, setUser] = useState({});
  const { currentUser} = useAuth();

  // Get data from firestore
  useEffect(() => {
    const getUser = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        setUser(userDocSnap.data());
      } catch (error) {
        console.log(error.message, "User could not be found");
      }
    };
    getUser();
  }, []);

  // Change and submit data
  const handleChange = async (e) => {
    e.preventDefault();

    /* if (profileImageRef.current.value === "/assets/user.png") {
      profileImageRef.current.value = user.profileImage;
    }
     */

    if (firstNameRef.current.value === "") {
      firstNameRef.current.value = user.name.first;
    }
    
    if (lastNameRef.current.value === "") {
      lastNameRef.current.value = user.name.last;
    }
    
    if (dateOfBirthRef.current.value === "") {
      dateOfBirthRef.current.value = user.dateOfBirth;
    }
    
    if (degreeLevelRef.current.value === "Choose degree level") {
      degreeLevelRef.current.value = user.degreeLevel;
    }
    
    // Edit data with a Try-Catch
    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, {
        name: {
          first: `${firstNameRef.current.value}`,
          last: `${lastNameRef.current.value}`,
        },
        dateOfBirth: `${dateOfBirthRef.current.value}`,
        degreeLevel: `${degreeLevelRef.current.value}`,
        /* profileImage: `${profileImageRef.current.value}`, */
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleChange}>
            <Form.Group controlId="changeFirstName" className="pb-2">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder={user?.name?.first}
                ref={firstNameRef}
              />
            </Form.Group>
            <Form.Group controlId="changeLastName" className="pb-2">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder={user?.name?.last}
                ref={lastNameRef}
              />
            </Form.Group>
            <Form.Group controlId="changeDateOfBirth" className="pb-2">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                placeholder={user?.dateOfBirth}
                ref={dateOfBirthRef}
              />
            </Form.Group>
            <Form.Group controlId="changeDegree" className="pb-3">
              <Form.Label>Degree</Form.Label>
              <Form.Select ref={degreeLevelRef} placeholder={user?.degreeLevel}>
                <option>Choose degree level</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="success"
              className="bg-tri"
              type="submit"
              onClick={handleClose}
            >
              Save changes
            </Button>

            <Button variant="secondary" className="ms-2" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
