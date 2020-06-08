import TodoItem from '../bl/note.js';
import Theme from '../ui/theme-controller.js';

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

        const newNote = {};
        newNote.title = document.getElementById('form__input--title').value;
        newNote.description = document.getElementById('form__input--desc').value;
        newNote.rating = document.getElementById('form__input--importance').value;
        newNote.finishdate = document.getElementById('form__input--duedate').value;

        sessionStorage.setItem("note", JSON.stringify(newNote));

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
        const theme = new Theme();
    });