import TokenService from './token-service';
import config from '../config';

const ProgressService = {
    getProgressByUser() {
        return fetch(`${config.API_ENDPOINT}/progress`, {
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
    postProgress(chapterNum) {
        return fetch(`${config.API_ENDPOINT}/progress`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                chapter_number: chapterNum,
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    getFetchProgressCallForUser() {
        return fetch(`${config.API_ENDPOINT}/progress`, {
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        });
    }

}

export default ProgressService;