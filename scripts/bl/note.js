import TodoList from '../bl/notes-storages.js';

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
    setId(id) {
        this.id = id;
    }
}