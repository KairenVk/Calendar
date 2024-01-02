import './Calendar.css'
import Task from "./Task";
import Day from "./Day";
export default function Calendar() {
    return (
        <div>
            <NavigationBar/>
            <CalendarWindow/>
        </div>
    );
}
function NavigationBar() {
    return (
        <>
            <div className="monthName">January
                <button>&lt;</button>
                <button>Today</button>
                <button>&gt;</button>
            </div>
        </>
    )
}

function CalendarWindow() {
    let today = new Date(Date.now());
    let todaysMonth = GetMonth(today);
    const listDays = todaysMonth.map(day =>
        <div>{day.weekday}</div>
    )
    return (
        <div>{listDays}</div>
    );
}

function GetMonth(date: Date) {
    let monthDays: Day[] = [];
    let numberOfDays: number = GetNumberOfDays(date);
    console.log(numberOfDays);
    for (let i = 1; i <= numberOfDays; i++) {
        date.setDate(i);
        console.log(date);
        monthDays.push(new Day(date.getDay(),date.getMonth(),date.getFullYear(),[]))
    }
    return monthDays;
}

function GetNumberOfDays(date: Date) {
    let month = date.getMonth();
    let year: number = date.getFullYear();

    if (month == 1 && (year % 400 == 0 || (year % 400 != 0 || (year % 100 != 0 && year % 4 == 0)))) {
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