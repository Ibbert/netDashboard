import { doc, getDoc } from "firebase/firestore";
import React, {useEffect, useState} from "react";
import { Container, Row, Col, Tabs, Tab, Table} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import InputHoursForm from "./InputHoursForm";
import { db } from "../../config/firebase";
import DateObject from "react-date-object";
import MoneyMadeChart from "../charts/MoneyMadeChart";
import LastYearChart from "../charts/LastYearChart";

export default function Dashboard() {
    const [user, setUser] = useState({})
    const {currentUser} = useAuth()
    let isLoggedIn = useState(true)
    let isWeekend = useState(true)
    let isSunday = useState(true)
    const weekend = ["friday", "saturday", "sunday"]
    const currentDate = new DateObject()
    let day = currentDate.weekDay.name.toLowerCase()
    
    if(!currentUser) {
        isLoggedIn = false
    }

    if(day !== weekend[0] && day !== weekend[1] && day !== weekend[2]) {
      isWeekend = false
    }

    if(day !== weekend[2]) {
      isSunday = false
    }

    // Runs once on load and per refresh.
    // Retrives user information from database.
    // And sets the retrived data in a object.
    useEffect(() => {
      const getUser = async () => {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef)
          setUser(userDocSnap.data())
        }
        catch(error) {
          console.log(error.message)
        }
      }

      getUser()
    }, [])

    return (
        <Container fluid className="bg-main min-vh-100"> 
          <Row>
            <Col md={12}>
            <h1 className="fw-light">
              Dashboard
            </h1>
            {isLoggedIn ? <p>Welcome {user?.name?.first}</p> : null}
            {isSunday ? <p>If you haven't logged yet, you should do so fast! Logging of hours closes today at 23:59!</p> : null}
            {isWeekend ? <InputHoursForm /> : <p>Cannot currently log hours! Wait till friday to log hours</p>}
            </Col>
          </Row>
          <Row>
            <Tabs>
              <Tab eventKey="moneyMadeLastYear" title="Money accumilated last year">
                <LastYearChart />
              </Tab>
              <Tab eventKey="moneyAccumilatedAt67" title="Money accumilated at 67">
                  <MoneyMadeChart />
              </Tab>
            </Tabs>
          </Row>
        </Container>
    )
}