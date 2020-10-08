import config from '../config';

const ExercisesService = {
    getAllExercises() {
        return fetch(`${config.API_ENDPOINT}/exercises`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    getExercisesLearnByChapter(chapt) {
        return fetch(`${config.API_ENDPOINT}/exercises/${chapt}/learn-pages`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    getExercisesDoByChapter(chapt) {
        return fetch(`${config.API_ENDPOINT}/exercises/${chapt}/do-pages`)
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
}

export default ExercisesService;
