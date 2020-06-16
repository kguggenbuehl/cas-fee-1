import httpService from '../bl/http-service.js';
import cookie from "../bl/cookie.js";

export default class NoteList {

    constructor() {
        this.sortBy = cookie.getCookie('sortBy') || 1;
        this.showFinishedNotes = cookie.getCookie('showFinishedNotes') || false;
    }

    async getNotes() {

        this.noteList = await httpService.ajax("GET", "/notes/", undefined);

        if (!this.showFinishedNotes){
            this.noteList = filterNotFinished(this.noteList);
        }

        if (this.sortBy === 1) {
            this.noteList = this.noteList.sort(sortByFinishDate);
        }
        else if (this.sortBy === 2) {
            this.noteList = this.noteList.sort(sortByCreateDate);
        }
        else if (this.sortBy === 3) {
            this.noteList = this.noteList.sort(sortByRate);
        }

        return this.noteList;
    }
    async setNote(note) {
        return await httpService.ajax("POST", "/notes/", {note: note});
    }
    async getNote(id) {
        return await httpService.ajax("GET", `/notes/${id}`, undefined);
    }
    async updateNote(id, note) {
        return await httpService.ajax("PATCH", `/notes/${id}`, {note: note});
    }
    async deleteNote(id) {
        return await httpService.ajax("DELETE", `/notes/${id}`);
    }
    async toggleIsFinishedById(id){

        let note = this.returnNoteById(id);
        note.isFinished = !note.isFinished;
        this.updateNote(id, note);

    }
    returnNoteById(id) {
        let note = this.noteList.filter(item => {
            return item._id === id;
        })
        return note[0];
    }
    setSortOrder(sortBy){
        this.sortBy = sortBy;
        try {
            cookie.setCookie('sortBy', sortBy, 365);
        }
        catch (e) {
            console.error(e);
        }

    }
    setShowFinishedStatus(showFinishedNotes){
        this.showFinishedNotes = showFinishedNotes;
        try {
            cookie.setCookie('showFinishedNotes', showFinishedNotes, 365);
        }
        catch (e) {
            console.error(e);
        }

    }

}

function filterNotFinished(noteList){
    console.log(noteList);
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