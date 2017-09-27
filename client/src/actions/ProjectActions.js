import axios from 'axios';

import AppDispatcher from '../dispatchers/AppDispatcher';
import ProjectActionTypes from '../constants/ProjectConstants';


export default {
    fetchProjects: () => {
        axios.get('/projects').then(function (response) {
            AppDispatcher.dispatch({
                type: ProjectActionTypes.FETCH_PROJECTS,
                projects: response.data
            });
        }).catch(function (error) {
            // TODO: Show an error message
        });
    },
}
