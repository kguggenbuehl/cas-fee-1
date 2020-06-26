import httpService from '../bl/http-service.js';
import cookie from "./cookie-service.js";

export default class NotesStorages {

    constructor() {
        this.noteList = [];
        this.sortBy = parseInt(cookie.getCookie('sortBy')) || 1;
        this.sortDirectionChanged = cookie.getCookie('sortDirectionChanged') === 'true';
        this.showFinishedNotes = cookie.getCookie('showFinishedNotes') === 'true';
    }
    async getNotes() {
        return await httpService.ajax("GET", `/notes/showfinished=${this.showFinishedNotes}`, undefined);
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
    sortList(notes){
        const sortOptions = [sortByFinishDate, sortByCreateDate, sortByRate];
        return notes.sort(sortOptions[this.sortBy - 1]);
    }
    setSortBy(sortBy){
        this.sortBy = sortBy;
        cookie.setCookie('sortBy', sortBy, 365);
    }
    changeSortDirection(notes, setCookie){
        if (setCookie) {
            this.setSortDirectionChanged(!this.sortDirectionChanged)
        }
        return notes.reverse();
    }
    setSortDirectionChanged(sortDirectionChanged){
        this.sortDirectionChanged = sortDirectionChanged;
        cookie.setCookie('sortDirectionChanged', this.sortDirectionChanged, 365);
    }
    setShowFinishedStatus(showFinishedNotes){
        this.showFinishedNotes = showFinishedNotes;
        cookie.setCookie('showFinishedNotes', showFinishedNotes, 365);
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