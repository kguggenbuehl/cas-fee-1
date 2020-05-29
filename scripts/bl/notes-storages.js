import staticTodos from '../dl/data.js';

export default function getNotes(orderBy, showFinished) {

    let allTodos = staticTodos();

    if (!showFinished){
        allTodos = allTodos.filter((value) => !value.finished);
    }

    return allTodos;
}



function sortByRate(todo1, todo2){
    return todo2.rating - todo1.rating;
}