import AppDispatcher from '../dispatchers/AppDispatcher';
import BaseStore from "./BaseStore";
import ProjectActionTypes from '../constants/ProjectConstants';


class ProjectStore extends BaseStore {
    constructor() {
        super();
        AppDispatcher.register(this._registerToActions.bind(this));
        this.projects = [];
    }

    _registerToActions(action) {
        switch(action.type) {
            case ProjectActionTypes.FETCH_PROJECTS:
                this.projects = action.projects;
                this.emitChange();
                break;
            default:
                break;
        }
    }
}

export default new ProjectStore();
