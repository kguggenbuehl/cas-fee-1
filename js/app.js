const todos = [
    {"id": "01", "title": "Lorem ipsum dolor sit amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 3, "finishdate": new Date("January 31 2020 12:30"),"finished": false, "createdate": new Date("January 31 2019 12:30")},
    {"id": "02", "title": "ipsum dolor sit ", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 2, "finishdate": new Date("January 10 2020 12:30"),"finished": false, "createdate": new Date("January 20 2019 12:30")},
    {"id": "03", "title": "Lorem  dolor amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 5, "finishdate": new Date("January 20 2020 12:30"),"finished": true, "createdate": new Date("January 10 2019 12:30")}
];

function sortByRate(todo1, todo2){
    return todo2.rating - todo1.rating;
}

function createTodoList(todos) {

    return todos.map(todo =>
        `<li class="todo ${ todo.finished ? 'todo--finished' : 'todo--open'}">
            <div class="todo__finishdate">
                <h2>${todo.finishdate}</h2>
            </div>
            <div class="todo__content">
                <div class="todo__heading border">
                    <div class="todo__title">
                        <h3>${todo.title}</h3>
                    </div>
                    <div class="todo__checkbox">
                        <input class="todo__input" type="checkbox" id="todo__input--0001"
                               name="todo__input" ${ todo.finished ? 'checked' : ''}>
                        <label class="todo__label" for="todo__input--0001">finished</label>
                    </div>
                    <div class="todo__rating">${todo.rating}</div>
                    <div class="todo__opener">
                        <button>show more</button>
                    </div>
                </div>
                <div class="todo__desc border">
                    <p>${todo.description}</p>
                </div>
            </div>
            <div class="todo__edit">
                <a class="btn border" href="#">edit</a>
            </div>
        </li>`
    ).join('');
}

function init() {
    // insert todo-list into DOM
    document.getElementById('app__todos-lst').innerHTML = createTodoList(todos);
    // add eventhandler to "Show finish"-Button
    document.getElementById('sort__input--show-finished').addEventListener('click', function(){
        document.getElementById('app__todos-lst').classList.toggle('app__todos-lst--hidefinished');
    })
    // add eventhandler to "Sort by importance"-Button
    document.getElementById('sort__input--rating').addEventListener('click', function(){
        document.getElementById('app__todos-lst').innerHTML = createTodoList(todos.sort(sortByRate));
    })
}

init();