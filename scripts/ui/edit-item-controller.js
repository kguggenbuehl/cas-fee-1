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

        let title = document.getElementById('form__input--title').value;
        let description = document.getElementById('form__input--desc').value;
        let rating = document.getElementById('form__input--importance').value;
        let finishdate = document.getElementById('form__input--duedate').value;

        let newitem = new TodoItem('', title, description, rating, finishdate, false);

        console.log(newitem);

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