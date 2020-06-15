import NoteList from '../bl/notes-storages.js';
import Theme from '../ui/theme-controller.js';

let templateContainer;
let templateSource;
let createNoteList;

let noteList = new NoteList();

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
        const deleteId = event.target.dataset.deleteId;

        if (finishId) {
            noteList.toggleIsFinishedById(finishId);
            return renderNoteList();
         }
        if (showMoreId) {
            const desc = document.querySelectorAll(`[data-desc-id="${showMoreId}"]`)[0];
            if (desc.style.display === "block") {
                desc.style.display = "none";
            } else {
                desc.style.display = "block";
            }
        }
        if (deleteId) {
            noteList.deleteNote(deleteId);
            return renderNoteList();
        }
    })

    // add eventhandler to "Show finish"-Button
    showFinishedButton.addEventListener('click', function(event){
        noteList.setShowFinishedStatus(event.target.checked);
        renderNoteList();
    })

    // add eventhandler to "Sort"-Buttons
    sortButtons.map(function(item){
        item.addEventListener('click', function(event){
            noteList.setSortOrder(parseInt(event.target.value));
            renderNoteList();
        })
    })
}

// update checked-status of buttons
function updateSortBar(){
    showFinishedButton.checked = noteList.showFinishedNotes;
    let activeBtn = sortButtons.filter(btn => btn.value === noteList.sortBy);
    activeBtn[0].checked = true;
}

// render DOM
async function renderNoteList(){
    const notes = await noteList.getNotes();
    templateContainer.innerHTML = createNoteList(notes);

}

// wait until scripts have been loaded
document.addEventListener(
'DOMContentLoaded',
() => {
    initEventHandlers();
});