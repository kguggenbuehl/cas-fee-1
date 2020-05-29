const todos = [
    {"id": "01", "title": "Lorem ipsum dolor sit amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 3, "finishdate": new Date("January 31 2020 12:30"),"finished": false, "createdate": new Date("January 31 2019 12:30")},
    {"id": "02", "title": "ipsum dolor sit ", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 2, "finishdate": new Date("January 10 2020 12:30"),"finished": false, "createdate": new Date("January 20 2019 12:30")},
    {"id": "03", "title": "Lorem  dolor amet", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", "rating": 5, "finishdate": new Date("January 20 2020 12:30"),"finished": true, "createdate": new Date("January 10 2019 12:30")}
];

function sortByRate(todo1, todo2){
    return todo2.rating - todo1.rating;
}

function init() {
    // add eventhandler to "Show finish"-Button
    document.getElementById('sort__input--show-finished').addEventListener('click', function(){
        document.getElementById('app__todos-lst').classList.toggle('app__todos-lst--hidefinished');
     })
    // add eventhandler to "Sort by importance"-Button
    document.getElementById('sort__input--rating').addEventListener('click', function(){
        document.getElementById('app__todos-lst').innerHTML = createTodoList(todos.sort(sortByRate));
    })

    const templateContainer = document.getElementById('app__todos');
    const templateSource = document.getElementById('template-todo-item').innerHTML;
    const createTodoList = Handlebars.compile(templateSource);

    templateContainer.innerHTML = createTodoList(todos);
}

class Bootstrapper {
    static start() {
        init();
    }
}

// wait until scripts have been loaded
document.addEventListener('DOMContentLoaded', Bootstrapper.start);