import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Card, Container, Image, Row } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import ProfileEdit from "./ProfileEdit";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const { currentUser } = useAuth();

  // Get data from firestore
  useEffect(() => {
    const getUser = async () => {
      try {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        setUser(userDocSnap.data());
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, []);

  // Display data from firestore
  return (
    <Container fluid className="bg-main min-vh-100 mx-auto text-center">
      <Row>
        <Card className="bg-second p-2 m-2 shadow">
          <div className="pb-2">
            <Image
              src={user?.profileImage || "/assets/user.png"}
              width={100}
              height={100}
              fluid
              roundedCircle
            />
          </div>
          <div className="pb-2 text">
            {user?.name?.first + " " + user?.name?.last}
          </div>
          <div className="pb-2 text">{user?.email}</div>

          <div className="pb-2 text">{user?.degreeLevel}</div>

          <div className="pb-2 text">{user?.dateOfBirth}</div>

          <div className="mx-auto gap-1">
            <ProfileEdit />
          </div>
        </Card>
      </Row>
    </Container>
  );
}
