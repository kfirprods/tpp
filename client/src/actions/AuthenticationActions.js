import axios from 'axios';

import AppDispatcher from '../dispatchers/AppDispatcher';
import AuthenticationActionTypes from '../constants/AuthenticationConstants';


export default {
    loginUser: (username, password) => {
        axios.post('/login', {
            username: username,
            password: password
        }).then(function (response) {
            AppDispatcher.dispatch({
                type: AuthenticationActionTypes.LOGIN_USER,
                username: username
            });
        }).catch(function (error) {
            if (error.response.status === 401) {
                // handle bad login
                AppDispatcher.dispatch({
                    type: AuthenticationActionTypes.LOGIN_FAILED,
                    reason: error.response.data.message
                });
            }
            else if (error.response.status === 500) {
                // handle server error
                AppDispatcher.dispatch({
                    type: AuthenticationActionTypes.LOGIN_FAILED,
                    reason: error.response
                });
            }
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
