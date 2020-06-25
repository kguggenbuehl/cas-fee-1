import Note from '../bl/note.js';
import NoteList from '../bl/notes-storages.js';
import Theme from '../ui/theme-controller.js';
import httpService from "../bl/http-service.js";
import getDataFromQuery from "../bl/shared.js";

let templateContainer;
let templateSource;
let createForm;

const noteList = new NoteList();

function initEventHandlers() {
    // init template
    templateContainer = document.getElementById('app__form');
    templateSource = document.getElementById('template-form').innerHTML;
    createForm = Handlebars.compile(templateSource);

    // add eventhandler to "Save"-Button
    templateContainer.addEventListener('click', async function (event) {
        if( event.target === document.getElementById('form__submit')){

            event.preventDefault() ;

            const newNote = new Note();
            newNote.title = document.getElementById('form__input--title').value;
            newNote.description = document.getElementById('form__input--desc').value;
            newNote.rating = document.getElementById('form__input--importance').value;
            newNote.finishDate = new Date(document.getElementById('form__input--duedate').value);
            newNote.isFinished = document.getElementById('form__input--is-finished').checked;

            let id = getDataFromQuery('id');

            if (id) {
                await noteList.updateNote(id, newNote);
            } else {
                await noteList.setNote(newNote);
            }

            window.location.replace("index.html");

        }
    })
}

// render DOM
async function renderForm(){
    const id = getDataFromQuery('id');
    const note = await noteList.getNote(id) || {};
    templateContainer.innerHTML = createForm(note);
}

// wait until scripts have been loaded
document.addEventListener(
    'DOMContentLoaded',
    () => {
        initEventHandlers();
        // render DOM
        renderForm();
    });