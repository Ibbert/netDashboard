import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useAuth } from "../../context/AuthContext";
import { getDocs, collection, query, orderBy, doc, getDoc, contains } from "firebase/firestore";
import { db } from "../../config/firebase";
import DateObject from "react-date-object";

export default function LastYearChart() {
    const [loggedHours, setLoggedHours] = useState([])
    const [user, setUser] = useState({})
    const {currentUser} = useAuth()
    const degreeLevels = ["Bachelor", "Master", "Phd"]
    let thisYear = new Date().getFullYear().toString()

      /* Gets data from database and maps it */
      useEffect(() => {
        const getHours = async () => {
          try {
            const loggedHoursColRef = collection(db, 'users', currentUser.uid, 'loggedHours') 
            const q = query(loggedHoursColRef, orderBy('date', "asc"))
            const loggedHoursDocSnap = await getDocs(q)
            setLoggedHours(loggedHoursDocSnap.docs.map((doc) => ({...doc.data()})))

          }
          catch(error) {
            console.log(error.message)
          }
        }
        getHours()
    }, [])


    /* gets data from users doc */
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


    /* Puts hours and dates into map, and returns it  */
    const userDegree = user.degreeLevel
    const userAgeData = user.dateOfBirth

    let salary = 0
    /* Checks what degree the user has */
    if (userDegree == degreeLevels [0]) {
      salary = 120
    } else if (userDegree == degreeLevels [1]) {
      salary = 150
    } else if (userDegree == degreeLevels [2]) {
      salary = 170
    } else {
      salary = 100
    }

    /* Gets hours as an array full of strings */
    const hoursArr = loggedHours.map((item) => {
      return item.hours
    })

    /* Gets date */ 
    const dateArr = loggedHours.map((item) => {
      let date = item.date.substring(0, 10)
      return date
    })

    // console.log(dateArr)
    /* Gets users age */
    let userAgeFromDb = new DateObject(userAgeData)

    let currentYearDateArr = dateArr.filter(a => a.includes(thisYear));
    // console.log(currentYearDateArr)

    /* Transfroms string array to int array */
    let hours = hoursArr.map(i => Number(i))

    /* Array of cumulative sum */
    let hoursForSalary = hours.map((sum => value => sum += value)(0));

    let moneyThisYear = hoursForSalary.map(function(x) { return x * salary })

    const data = {
      labels: currentYearDateArr,
      datasets: [{
        label: "Money accumilated so far in " + thisYear,
        backgroundColor: "green",
        borderColor: "green",
        color: "white",
        data: moneyThisYear, 
      }],
      xAxes: [{
        ticks: {
          max: 52
        }
      }]
    }

    return (
      <Card className="bg-second text-white p-2 m-2 shadow">
        <Line 
        style={{maxWidth: '100%'}}
        data={data} 
        />
      </Card>
    )
}