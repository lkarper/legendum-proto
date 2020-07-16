import TokenService from './token-service';
import config from '../config'

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
};

export default NotesService;