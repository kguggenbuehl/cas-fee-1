import NotesStorages from '../bl/notes-storages.js';
import Theme from '../ui/theme-controller.js';

let templateContainer;
let templateSource;
let createNoteList;

let showFinishedButton;
let sortButtons;

let notesStorages = new NotesStorages();

function initEventHandlers() {
    // init template
    templateContainer = document.getElementById('app__todos');
    templateSource = document.getElementById('template-todo-item').innerHTML;
    createNoteList = Handlebars.compile(templateSource);

    showFinishedButton = document.getElementById('sort__input--show-finished');
    sortButtons = Array.from(document.getElementsByClassName('sort__input'));

    // add eventlistener to finish- and show-more-Button
    templateContainer.addEventListener('click', function(event){
        const finishId = event.target.dataset.finishId;
        const showMoreId = event.target.dataset.showMoreId;
        const deleteId = event.target.dataset.deleteId;

        if (finishId) {
            notesStorages.toggleIsFinishedById(finishId);
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
            notesStorages.deleteNote(deleteId);
            return renderNoteList();
        }
    })

    // add eventlistener to "Show finish"-Button
    showFinishedButton.addEventListener('click', function(event){
        notesStorages.setShowFinishedStatus(event.target.checked);
        return renderNoteList();
    })

    // add eventlistener to "Sort"-Buttons
    sortButtons.map(function(item){
        item.addEventListener('click', async function(event){
            const sortBtnValue = parseInt(event.target.value);
            if (sortBtnValue === notesStorages.sortBy) {
                await notesStorages.changeSortDirection(notesStorages.noteList, true);
            }
            else {
                notesStorages.setSortBy(sortBtnValue);
                await notesStorages.sortList(notesStorages.noteList)
            }
            return updateNoteList(notesStorages.noteList);
        })
    })
}

// update checked-status of buttons
function updateSortBar(){
    showFinishedButton.checked = notesStorages.showFinishedNotes;
    let activeBtn = sortButtons.filter(btn => parseInt(btn.value) === notesStorages.sortBy);
    activeBtn[0].checked = true;
}

// get Notes
async function renderNoteList(){
    notesStorages.noteList = await notesStorages.getNotes();
    notesStorages.sortList(notesStorages.noteList);
    if (notesStorages.sortDirectionChanged) {
        notesStorages.changeSortDirection(notesStorages.noteList, false)
    };
    updateNoteList(notesStorages.noteList);
}

// render DOM
function updateNoteList(notes){
    templateContainer.innerHTML = createNoteList(notes);
}

// wait until scripts have been loaded
document.addEventListener(
'DOMContentLoaded',
() => {
    initEventHandlers();
    // update sort-bar
    updateSortBar();
    // render DOM
    renderNoteList();
});