import jwtDecode from 'jwt-decode';
import config from '../config';

let _timeoutId;

const TokenService = {
    saveAuthToken(token) {
        // Saves jwt to local storage
        window.sessionStorage.setItem(config.TOKEN_KEY, token);
    },
    getAuthToken() {
        return window.sessionStorage.getItem(config.TOKEN_KEY);
    },
    clearAuthToken() {
        window.sessionStorage.removeItem(config.TOKEN_KEY);
    },
    hasAuthToken() {
        return !!TokenService.getAuthToken();
    },
    parseJwt(jwt) {
        return jwtDecode(jwt);
    },
    readJwtToken() {
        return TokenService.parseJwt(TokenService.getAuthToken());
    },
    _getMsUntilExpiry(payload) {
        /* 
            Returns the number of ms until the jwt expires.
            payload.exp value is in seconds, so it is converted to ms.
        */
        return (payload.exp * 1000) - Date.now();
    },
    queueCallbackBeforeExpiry(callback) {
        const msUntilExpiry = TokenService._getMsUntilExpiry(
            TokenService.readJwtToken()
        );
        /*
            Queues a callback that will happen 30 seconds before the jwt expires.
            The callback is used to call the jwt refresh endpoint.
        */
        _timeoutId = setTimeout(callback, msUntilExpiry - 30000);
    },
    clearCallbackBeforeExpiry() {
        /*
            Clears the timeout the would call the jwt refresh endpoint.
            Used when the user logs out, so that the token is not refreshed after logout. 
        */
        clearTimeout(_timeoutId);
    },
}

export default TokenService
