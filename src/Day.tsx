import Task from "./Task";

export default class Day {
    weekday: string;
    month: number;
    year: number;
    tasks: Task[];

    constructor(weekday: number, month: number, year: number, tasks: Task[]) {
        switch (weekday) {
            case 0:
                this.weekday = "Sunday";
                break;
            case 1:
                this.weekday = "Monday";
                break;
            case 2:
                this.weekday = "Tuesday";
                break;
            case 3:
                this.weekday = "Wednesday";
                break;
            case 4:
                this.weekday = "Thursday";
                break;
            case 5:
                this.weekday = "Friday";
                break;
            case 6:
                this.weekday = "Saturday";
                break;
            default:
                this.weekday = "Sunday";
                break;
        }
        this.month = month;
        this.year = year;
        this.tasks = tasks;
    }
}