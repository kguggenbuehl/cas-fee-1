import Note from '../bl/note.js';
import NoteList from '../bl/notes-storages.js';
import Theme from '../ui/theme-controller.js';
import httpService from "../bl/http-service.js";

let templateContainer;
let templateSource;
let createForm;

let saveButton;

const noteList = new NoteList();

function initEventHandlers() {
    // init template
    templateContainer = document.getElementById('app__form');
    templateSource = document.getElementById('template-form').innerHTML;
    createForm = Handlebars.compile(templateSource);

    // render DOM
    renderForm();

    // add eventhandler to "Save"-Button
    templateContainer.addEventListener('click', function (event) {
        if( event.target === document.getElementById('form__submit')){

            event.preventDefault() ;

            const newNote = new Note();
            newNote.title = document.getElementById('form__input--title').value;
            newNote.description = document.getElementById('form__input--desc').value;
            newNote.rating = document.getElementById('form__input--importance').value;
            newNote.finishDate = new Date(document.getElementById('form__input--duedate').value);

            let id = getDataFromQuery('id');

            if (id) {
                httpService.ajax("PATCH", `/notes/${id}`, {note: newNote})
            } else {
                noteList.setNote(newNote);
            }

            window.location.replace("app.html");

        };
    })
}

// render DOM
async function renderForm(){
    const id = getDataFromQuery('id');
    const notes = await noteList.getNote(id) || {};
    templateContainer.innerHTML = createForm(notes);
}

function getDataFromQuery(key){
    const params = new URLSearchParams(window.location.search);
    const value = params.get(key) || false;
    return value;
}

// wait until scripts have been loaded
document.addEventListener(
    'DOMContentLoaded',
    () => {
        initEventHandlers();
        const theme = new Theme();
    });