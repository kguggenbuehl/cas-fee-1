export default class Note {
    constructor(id, title, description, rating, finishDate, isFinished ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.finishDate = finishDate;
        this.isFinished = isFinished;
        this.createDate = new Date();
    }
    toggleFinishedStatus() {
        this.isFinished = !this.isFinished;
    }
}