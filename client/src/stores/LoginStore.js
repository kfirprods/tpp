import AppDispatcher from '../dispatchers/AppDispatcher';
import BaseStore from "./BaseStore";
import AuthenticationActionTypes from '../constants/AuthenticationConstants';


class LoginStore extends BaseStore {

    constructor() {
        super();
        AppDispatcher.register(this._registerToActions.bind(this));
        this.isLoggedIn = false;
        this.errorMessage = "";
        this.username = "";
    }

    _registerToActions(action) {
        switch(action.type) {
            case AuthenticationActionTypes.LOGIN_USER:
                this.isLoggedIn = true;
                this.username = action.username;
                this.emitChange();
                break;
            case AuthenticationActionTypes.LOGIN_FAILED:
                this.errorMessage = action.reason;
                this.emitChange();
                break;
            default:
                break;
        }
    }
}

export default new LoginStore();
