import todos from '../dl/data.js';

function initEventHandlers() {

    const templateContainer = document.getElementById('app__todos');
    const templateSource = document.getElementById('template-todo-item').innerHTML;
    const createTodoList = Handlebars.compile(templateSource);

    templateContainer.innerHTML = createTodoList(todos);

    // add eventhandler to "Show finish"-Button
    document.getElementById('sort__input--show-finished').addEventListener('click', function(){
        document.getElementById('app__todos-lst').classList.toggle('app__todos-lst--hidefinished');
    })
    // add eventhandler to "Sort by importance"-Button
    document.getElementById('sort__input--rating').addEventListener('click', function(){
        document.getElementById('app__todos-lst').innerHTML = createTodoList(todos.sort(sortByRate));
    })

}

// wait until scripts have been loaded
document.addEventListener(
    'DOMContentLoaded',
    () => {
        initEventHandlers();
    });