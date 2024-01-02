export default class Task {
    startDate: Date;
    endDate: Date;
    title: string;
    description: string;
    isReoccurring: boolean;

    constructor(startDate: Date, endDate: Date, title: string, description: string, isReoccurring: boolean) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.title = title;
        this.description = description;
        this.isReoccurring = isReoccurring;
    }
}

