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
    postProgress(chapterId) {
        return fetch(`${config.API_ENDPOINT}/progress`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                exercise_id: chapterId,
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    }

}

export default ProgressService;