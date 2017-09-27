import React from 'react';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';

import { projectNameValidators } from '../../validators/project';
import { textFieldStyle } from '../../styles/forms';
import ProjectActions from '../../actions/ProjectActions';
import ProjectPermissionSelector from '../atomic/ProjectPermissionSelector';


export default class CreateProject extends React.Component {
    constructor() {
        super();
        this.state = {
            projectId: -1,
            projectName: ""
        };

        this.handleProjectNameChanged = this.handleProjectNameChanged.bind(this);
        this.createProject = this.createProject.bind(this);
    }

    handleProjectNameChanged(e) {
        this.setState({projectName: e.target.value});
    }

    createProject(e) {
        e.preventDefault();

        ProjectActions.createProject(this.state.projectName);
    }

    render() {
        if (this.state.projectId >= 0) {
            let projectUrl = `/projects/${this.state.projectId}`;
            return (<Redirect to={projectUrl} />);
        }

        return (
            <div className="container">
                <div className="auth-container create-project-container">
                    <h1 className="title text-center">Create Project</h1>

                    <form>
                        <div className="form-group">
                            <ReactTextField type="text"
                                            style={textFieldStyle}
                                            onChange={this.handleProjectNameChanged}
                                            className="form-control"
                                            placeholder="Project Name"
                                            validators={projectNameValidators} />
                        </div>

                        <div className="form-group">
                            <ProjectPermissionSelector />
                        </div>

                        <div className="form-group">
                            /* If possible, existence validation */

                        </div>

                        <div className="form-group">
                            /* Auto-complete aggregated list box */

                        </div>

                        <Button className="btn btn-primary btn-lg btn-block login-button"
                                type="submit"
                                onClick={this.createProject}>Create</Button>
                    </form>
                </div>
            </div>
        )
    }
}
