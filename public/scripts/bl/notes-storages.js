import Note from "../bl/note.js";
import httpService from '../bl/http-service.js'

export default class NoteList {
    constructor() {

    }
    async getNotes(orderBy, showFinishedNotes) {

        this.noteList = await httpService.ajax("GET", "/notes/", undefined);

        if (!showFinishedNotes){
            this.noteList = filterNotFinished(this.noteList);
        }

        if(orderBy === 1) {
            this.noteList = this.noteList.sort(sortByFinishDate);
        }
        else if (orderBy === 2) {
            this.noteList = this.noteList.sort(sortByCreateDate);
        }
        else if (orderBy === 3) {
            this.noteList = this.noteList.sort(sortByRate);
        }

        return this.noteList;
    }

    async toggleIsFinishedById(id){

        let note = this.returnNoteById(id);

        note.isFinished = !note.isFinished;

        return await httpService.ajax("PATCH", `/notes/${id}`, {note: note});

    }
    returnNoteById(id) {
        let note = this.noteList.filter(item => {
            return item._id === id;
        })
        return note[0];
    }
    async setNote(note) {
        console.log(note);
        return await httpService.ajax("POST", "/notes/", {note: note});
    }
}

function filterNotFinished(noteList){
    return noteList.filter((item) => !item.isFinished);
}

function sortByRate(note1, note2){
    return note2.rating - note1.rating;
}

function sortByFinishDate(note1, note2){
    return new Date(note1.finishDate).getTime() - new Date(note2.finishDate).getTime();
}

function sortByCreateDate(note1, note2){
    return new Date(note1.createDate).getTime() - new Date(note2.createDate).getTime();
}