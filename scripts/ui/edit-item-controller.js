import TodoItem from '../bl/note.js';

let templateContainer;
let templateSource;
let createForm;

let saveButton;

function initEventHandlers() {
    // init template
    templateContainer = document.getElementById('app__form');
    templateSource = document.getElementById('template-form').innerHTML;
    createForm = Handlebars.compile(templateSource);

    // render DOM
    renderForm();

    // add eventhandler to "Save"-Button
    saveButton = document.getElementById('form__submit');
    saveButton.addEventListener('click', function (event) {
        event.preventDefault();

        const title = document.getElementById('form__input--title').value;
        const description = document.getElementById('form__input--desc').value;
        const rating = document.getElementById('form__input--importance').value;
        const finishdate = document.getElementById('form__input--duedate').value;

        const newitem = new TodoItem('', title, description, rating, finishdate, false);

        newitem.setStorage(title);

        window.location.replace("app.html");
    })
}

// render DOM
function renderForm(){
    templateContainer.innerHTML = createForm([]);
}

// wait until scripts have been loaded
document.addEventListener(
    'DOMContentLoaded',
    () => {
        initEventHandlers();
    });