import { collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

export default function LogbookPage() {
    const [loggedHours, setLoggedHours] = useState([])
    const {currentUser} = useAuth()

    useEffect(() => {
        const getHours = async () => {
          try {
            const loggedHoursColRef = collection(db, 'users', currentUser.uid, 'loggedHours')
            const dbQuery = query(loggedHoursColRef, orderBy('date', "asc")) 
            const LoggedHoursColSnap = await getDocs(dbQuery)
            setLoggedHours(LoggedHoursColSnap.docs.map((doc) => ({...doc.data()})))
          }
          catch(error) {
            console.log(error.message)
          }
        }
        
        getHours()
    }, [])

    return (
        <Container fluid className="bg-main min-vh-100 p-2">
             <h1 className="fw-light">
              Logbook
            </h1>
            <Table bordered className="bg-second">
                <thead>
                    <tr>
                        <th>Hours</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loggedHours.map((loggedItem) => {
                        const hours = loggedItem.hours
                        const date = loggedItem.date
                        return (
                            <tr>
                                <td className="text-center">{hours}</td>   
                                <td className="text-center">{date}</td>   
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}