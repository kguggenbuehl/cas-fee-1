export default class TodoItem {
    constructor(id, title, description, rating, finishdate, finished ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.finishdate = finishdate;
        this.finished = finished;
        this.createDate = Date.now();
    }
    toggleFinished() {
        this.finished = !this.finished;
    }
    setStorage(){
        sessionStorage.setItem("todoItem", JSON.stringify(this));
    }
}