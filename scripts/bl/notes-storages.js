import TodoItem from "../bl/note.js";

export default class TodoList {
    constructor() {
        this.todos = [
            new TodoItem(1, "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 2, new Date("January 31 2020 12:30"), false),
            new TodoItem(2, "ipsum dolor sit ", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 3, new Date("January 20 2020 12:30"), false),
            new TodoItem(3, "Lorem ipsum dolor amet", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 1, new Date("January 10 2020 12:30"), true),
            new TodoItem(4, "sit amet", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 5, new Date("January 15 2020 12:30"), true),
            new TodoItem(5, "Lorem ipsum ", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 1, new Date("January 05 2020 12:30"), false),
        ];
    }
    getNotes(orderBy, showFinished) {

        let allTodos = this.todos;

        if (!showFinished){
            allTodos = filterNotFinished(allTodos);
        }

        if(orderBy === 1) {
            allTodos = allTodos.sort(sortByFinishDate);
        }
        if(orderBy === 2) {
            allTodos = allTodos.sort(sortByCreateDate);
        }
        if(orderBy === 3) {
            allTodos = allTodos.sort(sortByRate);
        }

        return allTodos;
    }
    toggleFinishedById(id){
        let note = this.todos.filter(item => {
            return item.id === parseInt(id);
        })
        note[0].toggleFinished();
    }
    returnTodoById(id) {
        let note = this.todos.filter(item => {
            return item.id === id;
        })
        return note;
    }
    setTodo(note) {
        this.todos.push(note);
    }
    getStorage(){
        let item = JSON.parse(sessionStorage.getItem("todoItem"));
        if( !item ) {
            return false;
        }
        this.setTodo(item);
        console.log(item);
        sessionStorage.removeItem('todoItem');
    }

}

function filterNotFinished(allTodos){
    return allTodos.filter((value) => !value.finished);
}

function sortByRate(todo1, todo2){
    return todo2.rating - todo1.rating;
}

function sortByFinishDate(todo1, todo2){
    return todo1.finishdate - todo2.finishdate;
}

function sortByCreateDate(todo1, todo2){
    return todo2.createdate - todo1.createdate;
}