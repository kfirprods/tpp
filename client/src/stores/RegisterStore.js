import AppDispatcher from '../dispatchers/AppDispatcher';
import BaseStore from "./BaseStore";
import AuthenticationActionTypes from '../constants/AuthenticationConstants';


class RegisterStore extends BaseStore {

    constructor() {
        super();
        AppDispatcher.register(this._registerToActions.bind(this));
        this.registrationSucceeded = false;
        this.errorMessage = "";
        this.fieldErrors = [];
    }

    _registerToActions(action) {
        switch(action.type) {
            case AuthenticationActionTypes.REGISTRATION_SUCCEEDED:
                this.registrationSucceeded = true;
                this.emitChange();
                break;
            case AuthenticationActionTypes.REGISTRATION_FAILED:
                this.errorMessage = action.reason;
                this.emitChange();
                break;
            case AuthenticationActionTypes.REGISTRATION_FORBIDDEN:
                this.fieldErrors = action.fieldErrors;
                this.emitChange();
                break;
            default:
                break;
        }
    }
}

export default new RegisterStore();
