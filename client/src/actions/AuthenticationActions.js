import AppDispatcher from '../dispatchers/AppDispatcher';
import AuthenticationActionTypes from '../constants/AuthenticationConstants';


export default {
    loginUser: () => {
        AppDispatcher.dispatch({
            type: AuthenticationActionTypes.LOGIN_USER
        });
    },

    loginFailed: (message) => {
        AppDispatcher.dispatch({
            type: AuthenticationActionTypes.LOGIN_FAILED,
            reason: message
        });
    },

    registerUser: () => {
        AppDispatcher.dispatch({
            type: AuthenticationActionTypes.REGISTRATION_SUCCEEDED
        });
    },

    registrationFailed: (message) => {
        AppDispatcher.dispatch({
            type: AuthenticationActionTypes.REGISTRATION_FAILED,
            reason: message
        });
    },

    registrationForbidden: (errors) => {
        AppDispatcher.dispatch({
            type: AuthenticationActionTypes.REGISTRATION_FORBIDDEN,
            fieldErrors: errors
        });
    },
}
