import LOGIN_USER from '../constants/LoginConstants';
import LOGOUT_USER from '../constants/LoginConstants';
import BaseStore from './BaseStore';
import AppDispatcher from "../dispatchers/AppDispatcher";


class LoginStore extends BaseStore {

    constructor() {
        super();
        this._dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
        this._user = null;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case LOGIN_USER:
                this._user = action.username;
                this.emitChange();
                break;
            case LOGOUT_USER:
                this._user = null;
                this.emitChange();
                break;
            default:
                break;
        }
    }

    get user() {
        return this._user;
    }

    isLoggedIn() {
        return !!this._user;
    }
}

export default new LoginStore();