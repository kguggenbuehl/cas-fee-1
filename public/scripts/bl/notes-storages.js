import httpService from '../bl/http-service.js';
import cookie from "./cookie-service.js";

export default class NoteList {

    constructor() {
        this.sortBy = parseInt(cookie.getCookie('sortBy')) || 1;
        this.showFinishedNotes = cookie.getCookie('showFinishedNotes') === 'true';
    }

    async getNotes() {
        this.noteList = await httpService.ajax("GET", `/notes/showfinished=${this.showFinishedNotes}`, undefined);
        return this.sortList(this.noteList);
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
        await this.updateNote(id, note);

    }
    returnNoteById(id) {
        let note = this.noteList.filter(item => {
            return item._id === id;
        })
        return note[0];
    }
    sortList(){
        const sortOptions = [sortByFinishDate, sortByCreateDate, sortByRate];
        return this.noteList.sort(sortOptions[this.sortBy - 1]);
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

function sortByRate(note1, note2){
    return note2.rating - note1.rating;
}

function sortByFinishDate(note1, note2){
    return new Date(note1.finishDate).getTime() - new Date(note2.finishDate).getTime();
}

function sortByCreateDate(note1, note2){
    return new Date(note1.createDate).getTime() - new Date(note2.createDate).getTime();
}