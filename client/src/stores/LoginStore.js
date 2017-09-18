import AppDispatcher from '../dispatchers/AppDispatcher';
import BaseStore from "./BaseStore";
import LoginActionTypes from '../constants/LoginConstants';


class LoginStore extends BaseStore {

    constructor() {
        super();
        AppDispatcher.register(this._registerToActions.bind(this));
        this.isLoggedIn = false;
        this.errorMessage = "";
    }

    _registerToActions(action) {
        switch(action.type) {
            case LoginActionTypes.LOGIN_USER:
                this.isLoggedIn = true;
                this.emitChange();
                break;
            case LoginActionTypes.LOGIN_FAILED:
                this.errorMessage = action.reason;
                this.emitChange();
                break;
            default:
                break;
        }
    }
}

export default new LoginStore();
