import Datastore from 'nedb-promise'

export class Note {
    constructor(title, description, rating, finishDate) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.finishDate = new Date(finishDate);
        this.createDate = new Date();
        this.isFinished = false;
    }
}

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }
    async add(note) {
        let newNote = new Note(note.title, note.description, note.rating, note.finishDate);
        return await this.db.insert(newNote);
    }
    async delete(id) {
        await this.db.remove({_id: id});
        return await this.get(id);
    }
    async update(id, note) {
        await this.db.update({_id: id}, { $set: {title: note.title, description: note.description, rating: note.rating, finishDate: note.finishDate, isFinished: note.isFinished}}, {});
        return await this.get(id);
    }
    async get(id) {
        return await this.db.findOne({_id: id});
    }
    async all() {
        return await this.db.find({});
    }
    async getOnlyUnfinishedNotes(){
        return await this.db.find({isFinished: false});
    }
}

export const notesStore = new NotesStore();