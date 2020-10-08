import config from '../config';
import TokenService from './token-service';
import IdleService from './idle-service';

const AuthApiService = {
    postLogin(credentials) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then(res => {

                // Saves the jwt from api in local storage
                TokenService.saveAuthToken(res);

                // Registers the event listeners that will reset the idle timeout
                IdleService.regiserIdleTimerResets();

                // Queues a callback that will fire just before the jwt in local storage expires
                TokenService.queueCallbackBeforeExpiry(() => {
                    // Calls the api to send a new jwt
                    AuthApiService.postRefreshToken();
                });
                return res;
            });
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => 
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    postRefreshToken() {
        return fetch(`${config.API_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
        .then(res => {
            
            // Saves new jwt to local storage
            TokenService.saveAuthToken(res);

            // Queues a callback that will fire just before the jwt in local storage expires
            TokenService.queueCallbackBeforeExpiry(() => {
                // Calls the api to send a new jwt
                AuthApiService.postRefreshToken();
            });
            return res;
        })
        .catch(error => {
            console.log('refresh token request error');
            console.error(error);
        });
    },
}

export default AuthApiService;