const todos = [
    {"id": "01", "title": "Lorem ipsum dolor sit amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 3, "duedate": 0,"finished": false},
    {"id": "02", "title": "ipsum dolor sit ", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 2, "duedate": 0,"finished": false},
    {"id": "03", "title": "Lorem  dolor amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 5, "duedate": 0,"finished": true},
];

function createTodoList(todos) {

    return todos.map(todo =>
        `<li class="todo ${ todo.finished ? 'todo--finished' : 'todo--open'}">
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
    document.getElementById("app__todos-lst").innerHTML = createTodoList(todos);
}

init();