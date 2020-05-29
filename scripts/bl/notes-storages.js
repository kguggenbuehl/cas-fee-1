import staticTodos from '../dl/data.js';

export default function getNotes(orderBy, showFinished) {

    let allTodos = staticTodos();

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

function filterNotFinished(allTodos){
    return allTodos.filter((value) => !value.finished);
}

function sortByRate(todo1, todo2){
    return todo2.rating - todo1.rating;
}

function sortByFinishDate(todo1, todo2){
    return todo2.finishdate - todo1.finishdate;
}

function sortByCreateDate(todo1, todo2){
    return todo2.createdate - todo1.createdate;
}