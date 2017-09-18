import AppDispatcher from '../dispatchers/AppDispatcher';
import LoginActionTypes from '../constants/LoginConstants';


export default {
    loginUser: () => {
        AppDispatcher.dispatch({
            type: LoginActionTypes.LOGIN_USER
        });
    },

    loginFailed: (message) => {
        AppDispatcher.dispatch({
            type: LoginActionTypes.LOGIN_FAILED,
            reason: message
        });
    }
}
