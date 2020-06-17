import {notesStore} from '../services/notesStore'

export class NotesController {

    async getOnlyUnfinishedNotes(req, res) {
        res.json(await notesStore.getOnlyUnfinishedNotes() || []);
    };

    async getNotes(req, res) {
        if (req.params.showFinished === 'true') {
            res.json(await notesStore.all() || []);
        } else {
            res.json(await notesStore.getOnlyUnfinishedNotes() || []);
        }
    };

    async createNote(req, res) {
        res.json(await notesStore.add(req.body.note));
    };

    async showNote(req, res) {
        res.json(await notesStore.get(req.params.id));
    };

    async updateNote(req, res) {
        res.json(await notesStore.update(req.params.id, req.body.note));
    };

    async deleteNote(req, res) {
        res.json(await notesStore.delete(req.params.id));
    };
}

export const notesController = new NotesController();