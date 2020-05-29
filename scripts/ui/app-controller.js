import getNotes from '../bl/notes-storages.js';

let templateContainer;
let templateSource;
let createTodoList;

let sortBy = 1;
let showFinished = false;

let showFinishedButton = document.getElementById('sort__input--show-finished');
let sortButtons = Array.from(document.getElementsByClassName('sort__input'));

function initEventHandlers() {
    // init template
    templateContainer = document.getElementById('app__todos');
    templateSource = document.getElementById('template-todo-item').innerHTML;
    createTodoList = Handlebars.compile(templateSource);

    // update sort-bar
    updateSortBar();

    // render DOM
    renderTodoList();

    // add eventhandler to "Show finish"-Button
    showFinishedButton.addEventListener('click', function(event){
        showFinished = event.target.checked;
        renderTodoList();
    })

    // add eventhandler to "Sort"-Buttons
    sortButtons.map(function(value){
        value.addEventListener('click', function(event){
            sortBy = parseInt(event.target.value);
            renderTodoList();
        })
    })
}

// update checked-status of buttons
function updateSortBar(){
    showFinishedButton.checked = showFinished;
    let activeBtn = sortButtons.filter(btn => parseInt(btn.value) === sortBy);
    activeBtn[0].checked = true;
}

// render DOM
function renderTodoList(){
    templateContainer.innerHTML = createTodoList(getNotes(sortBy, showFinished));
}

// wait until scripts have been loaded
document.addEventListener(
'DOMContentLoaded',
() => {
    initEventHandlers();
});