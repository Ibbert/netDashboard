import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useAuth } from "../../context/AuthContext";
import { getDocs, collection, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import DateObject from "react-date-object";

export default function MoneyMadeChart() {
    const [loggedHours, setLoggedHours] = useState([])
    const [user, setUser] = useState({})
    const {currentUser} = useAuth()
    const degreeLevels = ["Bachelor", "Master", "Phd"]


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

    /* Gets users age */
    let userAgeFromDb = new DateObject(userAgeData)

    /* Adds 67 years to users age */
    let userAtSixtySevenObject = new DateObject(userAgeFromDb)
    userAtSixtySevenObject.year += 67
    let userAtSixtySeven = userAtSixtySevenObject.format("YYYY/MM/DD")
    
    /* Calculates 3 years and 5 years after first input date */
    let firstEntryData = dateArr[0]

    /* Makes the first entry date into a dateobject */
    let firstEntryObject = new DateObject(firstEntryData)


    /* Gets date from firstEntryData and adds three years to it */
    let firstThreeYearsObject = new DateObject(firstEntryObject)
    firstThreeYearsObject.year += 3
    let firstThreeYears = firstThreeYearsObject.format("YYYY/MM/DD")
    
    /* Gets date from firstEntryData and adds five years to it */
    let firstFiveYearsObject = new DateObject(firstThreeYearsObject)
    firstFiveYearsObject.year += 5
    let firstFiveYears = firstFiveYearsObject.format("YYYY/MM/DD") 
    

    /* Adds new dates to the array */
    dateArr.push(firstThreeYears, firstFiveYears)

    /* Transfroms string array to int array */
    let hours = hoursArr.map(i => Number(i))

    /* Array of cumulative sum */
    let hoursForSalary = hours.map((sum => value => sum += value)(0));

    /* Gets the accumulated money */
    let firstDoublingArr = hoursForSalary.map(function(x) { return x * salary })
    let secondDoublingFiveYearsArr = hoursForSalary.map(function(x) { return x * salary })

    let secondDoublingSalary = hoursForSalary.slice(-1)
    let threeYears = secondDoublingSalary.slice(-1)


    /* Doubles the accumulated money in 3 and 5 years*/
    let totalSalaryFirstDoubling = threeYears.map(function(x) { return( x * salary)* 2 });
    let totalSalarySecondDoubling = secondDoublingSalary.map(function(x) { return( x * salary) * 2 * 2 });

    /* Pushes the values into array */
    firstDoublingArr.push(totalSalaryFirstDoubling)
    secondDoublingFiveYearsArr = secondDoublingFiveYearsArr.concat(totalSalaryFirstDoubling, totalSalarySecondDoubling)

    
    let everyFiveYearsEntryObject = new DateObject(firstFiveYearsObject)


    firstDoublingArr.push(firstDoublingArr.slice(-1) * 2)

    let userAge = new DateObject(userAgeData)
    let dateToday = new DateObject()
    let userAgeTodayInYears = (dateToday.year - userAge.year)
    let userAgeToday = (userAgeTodayInYears + userAge.year)


    userAtSixtySeven = new DateObject(userAgeData)
    userAtSixtySeven.year += 67


    /* Adds 5 years to userAgeToday if userAgeToday is less than userAtSixtySeven. Adds these values to the date array, that gets added to graph */
    for (; userAgeToday <= userAtSixtySeven.year; userAgeToday += 5) {
      dateArr.push(everyFiveYearsEntryObject.year += 5)
      secondDoublingFiveYearsArr.push((secondDoublingFiveYearsArr.slice(-1) * 2))
      /* Removes last value if the last value of array exceeds the year the user is 67 */
      if (everyFiveYearsEntryObject.year > userAtSixtySeven.year) {
        dateArr.pop()
        secondDoublingFiveYearsArr.pop() 
        break;
      }
    }

    let dateMoneyObject = {}
    dateMoneyObject.date = dateArr
    dateMoneyObject.money = secondDoublingFiveYearsArr

    const data = {
      labels: dateMoneyObject.date,
      datasets: [{
        id: 1, 
        label: "Money accumulated at 67",
        backgroundColor: "green",
        borderColor: "green",
        color: "white",
        data: dateMoneyObject.money, 
      },
      {
      id: 2, 
      label: "Money accumulated 3 years and 8 years",
      backgroundColor: "blue",
      borderColor: "green",
      color: "white",
      data: firstDoublingArr, 
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