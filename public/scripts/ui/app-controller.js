import NoteList from '../bl/notes-storages.js';
import Theme from '../ui/theme-controller.js';

let templateContainer;
let templateSource;
let createNoteList;

let noteList = new NoteList();

let sortBy = 1;
let showFinishedNotes = false;

let showFinishedButton = document.getElementById('sort__input--show-finished');
let sortButtons = Array.from(document.getElementsByClassName('sort__input'));

function initEventHandlers() {
    // init template
    templateContainer = document.getElementById('app__todos');
    templateSource = document.getElementById('template-todo-item').innerHTML;
    createNoteList = Handlebars.compile(templateSource);

    // update sort-bar
    updateSortBar();

    // render DOM
    renderNoteList();

    // add eventhandler to finish- and show-more-Button
    templateContainer.addEventListener('click', function(event){
        const finishId = event.target.dataset.finishId;
        const showMoreId = event.target.dataset.showMoreId;

        if (finishId) {
            noteList.toggleIsFinishedById(finishId);
            renderNoteList();
         }
        if (showMoreId) {
            const desc = document.querySelectorAll(`[data-desc-id="${showMoreId}"]`)[0];
            if (desc.style.display === "block") {
                desc.style.display = "none";
            } else {
                desc.style.display = "block";
            }
        }
    })

    // add eventhandler to "Show finish"-Button
    showFinishedButton.addEventListener('click', function(event){
        showFinishedNotes = event.target.checked;
        renderNoteList();
    })

    // add eventhandler to "Sort"-Buttons
    sortButtons.map(function(item){
        item.addEventListener('click', function(event){
            sortBy = parseInt(event.target.value);
            renderNoteList();
        })
    })
}

// update checked-status of buttons
function updateSortBar(){
    showFinishedButton.checked = showFinishedNotes;
    let activeBtn = sortButtons.filter(btn => parseInt(btn.value) === sortBy);
    activeBtn[0].checked = true;
}

// render DOM
async function renderNoteList(){
    const notes = await noteList.getNotes(sortBy, showFinishedNotes);
    templateContainer.innerHTML = createNoteList(notes);

}

// wait until scripts have been loaded
document.addEventListener(
'DOMContentLoaded',
() => {
    initEventHandlers();
    const theme = new Theme();
});