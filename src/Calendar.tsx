import './Calendar.css'
import Task from "./Task";
import Day from "./Day";
import React, {useState} from "react";
let currentMonth = new Date(Date.now())

console.log("CurrentMonth:"+currentMonth);
export default function Calendar() {
    return (
        <div className="calendar-container">
            {/*<NavigationBar/>*/}
            <>{CalendarWindow()}</>
        </div>
    );
}
function NavigationBar() {
    return (
        <>

        </>
    )
}

function CalendarWindow() {
    function handleChangeMonth(change: number) {
        changeMonth(change);
        setMonthState(GetMonth(currentMonth))
        console.log(monthState);
    }
    const month = GetMonth(new Date(currentMonth));
    const [monthState, setMonthState] = useState(month);
    let startSlice = 0;
    let endSlice = 7;
    let rowsNum = 5;
    let rows = [];
    switch (month.length) {
        case 28:
            rowsNum = 4;
            break;
        case 42:
            rowsNum = 6;
            break;
        default:
            break;
    }
    for (let i = 0; i < rowsNum; i++) {
        rows.push(<div className="week-container">
            {month.slice(startSlice,endSlice).map(day => <div className="flex-item" key={day.key}>{day.day}<br/>{day.weekday}</div>)}
        </div> );
        startSlice += 7;
        endSlice += 7;
    }
    return (
        <>
            <div className="monthName">January
                <button onClick={e => handleChangeMonth(-1)}>&lt;</button>
                <button onClick={e => handleChangeMonth(0)}>Today</button>
                <button onClick={e => handleChangeMonth(-1)}>&gt;</button>
            </div>
            <div>{rows}</div>
        </>
)
    ;
}

function GetMonth(date: Date) { //TODO: refactor function
    let month: Date = date;
    let prevMonth = new Date(date.getTime());
    prevMonth.setMonth(prevMonth.getMonth()-1);
    let nextMonth = new Date(date.getTime());
    nextMonth.setMonth(nextMonth.getMonth()+1);
    let calendarArr: Day[] = [];
    let currMonthDaysCount = GetNumberOfDays(month);
    let prevMonthDaysCount = 0;
    let nextMonthDaysCount = 0;
    let prevMonthDaysNumber = GetNumberOfDays(prevMonth);
    let key = 0;
    month.setDate(1);
    let weekday = month.getDay();
    if ([0,6].includes(weekday) && currMonthDaysCount == 31) {
        console.log("if1")
        if (weekday == 0) {
            prevMonthDaysCount = 6;
            nextMonthDaysCount = 5;
        } else {
            prevMonthDaysCount = 5;
            nextMonthDaysCount = 6;
        }
    } else if (weekday == 0 && currMonthDaysCount == 30) {
        console.log("if2")
        prevMonthDaysCount = 6;
        nextMonthDaysCount = 6;
    } else if (weekday == 1 && currMonthDaysCount == 28) {
        console.log("if3")
        prevMonthDaysCount = 0;
        nextMonthDaysCount = 0;
    } else {
        console.log("if4")
        prevMonthDaysCount = weekday-1;
        nextMonthDaysCount = 35 - (prevMonthDaysCount+currMonthDaysCount)
    }
    let dayCounter = prevMonthDaysCount;
    console.log("dayCounter:"+dayCounter)
    for (dayCounter; dayCounter > 0; dayCounter--) {
        let day = prevMonthDaysNumber-dayCounter+1;
        prevMonth.setDate(day)
        calendarArr.push(new Day(key,prevMonth.getDate(),prevMonth.getDay(),prevMonth.getMonth(),prevMonth.getFullYear(),[]))
        key++;
    }
    for (let i = 1; i <= currMonthDaysCount; i++) {
        month.setDate(i);
        calendarArr.push(new Day(key,month.getDate(),month.getDay(),month.getMonth(),month.getFullYear(),[]))
        key++;
        // console.log(key)
    }
    for (let i = 1; i <= nextMonthDaysCount; i++) {
        nextMonth.setDate(i);
        calendarArr.push(new Day(key,nextMonth.getDate(),nextMonth.getDay(),nextMonth.getMonth(),nextMonth.getFullYear(),[]))
        key++;
    }
    // console.log(calendarArr);
    return calendarArr;
    // let monthDays: Day[] = [];
    // let numberOfDays: number = GetNumberOfDays(date);
    // for (let i = 1; i <= numberOfDays; i++) {
    //     date.setDate(i);
    //     monthDays.push(new Day(i,date.getDay(),date.getMonth(),date.getFullYear(),[]))
    // }
    // return monthDays;
}

function GetNumberOfDays(date: Date) {
    let month = date.getMonth();
    let year: number = date.getFullYear();

    if (month == 1 && (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))) {
        return 29;
    }

    switch (month) {
        case 1:
            return 28;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        default:
            return 31;

    }
}

function changeMonth(button: number) {
    switch (button) {
            case -1:
            console.log(currentMonth);
            if (currentMonth.getMonth() == 0) {
                console.log("gówno");
                currentMonth.setMonth(11);
                currentMonth.setFullYear(2023);
            } else {
                currentMonth.setMonth(currentMonth.getMonth()-1);
            }
            console.log(currentMonth);
            break;
        case 0:
            currentMonth.setMonth(new Date(Date.now()).getMonth());
            break;
        case 1:
            currentMonth.setMonth(currentMonth.getMonth()-1);
            break;
    }

}