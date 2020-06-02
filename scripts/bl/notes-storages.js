import Note from "../bl/note.js";

export default class NoteList {
    constructor() {
        this.noteList = [
            new Note(1, "Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 2, new Date("January 31 2020 12:30"), false),
            new Note(2, "ipsum dolor sit ", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 3, new Date("January 20 2020 12:30"), false),
            new Note(3, "Lorem ipsum dolor amet", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 1, new Date("January 10 2020 12:30"), true),
            new Note(4, "sit amet", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 5, new Date("January 15 2020 12:30"), true),
            new Note(5, "Lorem ipsum ", "Lorem ipsum dolor sit amet, consectetur adipisicing elit.", 1, new Date("January 05 2020 12:30"), false),
        ];
    }
    getNotes(orderBy, showFinishedNotes) {

        let noteList = this.noteList;

        if (!showFinishedNotes){
            noteList = filterNotFinished(noteList);
        }

        if(orderBy === 1) {
            noteList = noteList.sort(sortByFinishDate);
        }
        if(orderBy === 2) {
            noteList = noteList.sort(sortByCreateDate);
        }
        if(orderBy === 3) {
            noteList = noteList.sort(sortByRate);
        }
        console.log(noteList);
        return noteList;
    }
    getNumberOfNotes(){
        return this.noteList.length;
    }
    toggleIsFinishedById(id){
        let note = this.noteList.filter(item => {
            return item.id === parseInt(id);
        })
        note[0].toggleFinishedStatus();
    }
    returnNoteById(id) {
        let note = this.noteList.filter(item => {
            return item.id === id;
        })
        return note;
    }
    setNote(note) {
        this.noteList.push(note);
    }
    getStorage(){
        let newNote = JSON.parse(sessionStorage.getItem("note"));
        if( !newNote ) {
            return false;
        }
        newNote = new Note(this.getNumberOfNotes(), newNote.title, newNote.description, newNote.rating, new Date(newNote.finishdate), false);
        this.setNote(newNote);
        sessionStorage.removeItem('note');
    }

}

function filterNotFinished(noteList){
    return noteList.filter((item) => !item.isFinished);
}

function sortByRate(note1, note2){
    return note2.rating - note1.rating;
}

function sortByFinishDate(note1, note2){
    return note1.finishDate - note2.finishDate;
}

function sortByCreateDate(note1, note2){
    return note2.createDate - note1.createDate;
}