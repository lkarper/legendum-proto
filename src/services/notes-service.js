import TokenService from './token-service';
import config from '../config';

const NotesService = {
    getNotesByUser() {
        return fetch(`${config.API_ENDPOINT}/notes`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    getFetchNotesCallByUser() {
        return fetch(`${config.API_ENDPOINT}/notes`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        });
    },
    postNote(hintId, customNote) {
        return fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                hint_id: hintId,
                custom_note: customNote,
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    updateNote(noteId, customNote) {
        return fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'PATCH',
            body: JSON.stringify(customNote),
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`, 
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    },
    deleteNote(noteId) {
        return fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e));
                }
            });
    }
};

export default NotesService;
