import getNotes from '../bl/notes-storages.js';

let templateContainer;
let templateSource;
let createTodoList;

function initEventHandlers() {

    templateContainer = document.getElementById('app__todos');
    templateSource = document.getElementById('template-todo-item').innerHTML;
    createTodoList = Handlebars.compile(templateSource);

    renderTodoList(1, false);

    // add eventhandler to "Show finish"-Button
    document.getElementById('sort__input--show-finished').addEventListener('click', function(event){
        renderTodoList(1, event.target.checked);
    })
    // add eventhandler to "Sort by importance"-Button
    document.getElementById('sort__input--rating').addEventListener('click', function(){
        document.getElementById('app__todos-lst').innerHTML = createTodoList(todos.sort(sortByRate));
    })

}

function renderTodoList(sortBy, showFinished){
    templateContainer.innerHTML = createTodoList(getNotes(sortBy, showFinished));
}

// wait until scripts have been loaded
document.addEventListener(
    'DOMContentLoaded',
    () => {
        initEventHandlers();
    });