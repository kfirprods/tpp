import React from 'react';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';

import { projectNameValidators } from '../../validators/project';
import { textFieldStyle } from '../../styles/forms';
import ProjectActions from '../../actions/ProjectActions';
import ProjectPermissionSelector from '../atomic/ProjectPermissionSelector';
import RepositorySelector from '../atomic/RepositorySelector';


export default class CreateProject extends React.Component {
    constructor() {
        super();
        this.state = {
            projectId: -1,
            projectName: "",
            selectedAdministrators: [],
            selectedLeads: [],
            selectedStandardUsers: [],
            selectedRepository: ""
        };

        this.handleProjectNameChanged = this.handleProjectNameChanged.bind(this);
        this.selectedAdministratorsChanged = this.selectedAdministratorsChanged.bind(this);
        this.selectedLeadsChanged = this.selectedLeadsChanged.bind(this);
        this.selectedStandardUsersChanged = this.selectedStandardUsersChanged.bind(this);
        this.createProject = this.createProject.bind(this);
    }

    handleProjectNameChanged(e) {
        this.setState({projectName: e.target.value});
    }

    selectedAdministratorsChanged(admins) {
        this.setState({selectedAdministrators: admins});
    }

    selectedLeadsChanged(leads) {
        this.setState({selectedLeads: leads});
    }

    selectedStandardUsersChanged(users) {
        this.setState({selectedStandardUsers: users});
    }

    selectedRepositoryChanged(repository) {
        this.setState({selectedRepository: repository});
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
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-unlock fa" aria-hidden="true" /></span>
                                <div className="icon-label">Project Administrators (Full Permissions)</div>
                            </div>

                            <ProjectPermissionSelector value={this.state.selectedAdministrators}
                                                       onChange={this.selectedAdministratorsChanged} />
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-unlock-alt fa" aria-hidden="true" /></span>
                                <div className="icon-label">Project Leads (Read, Execute and Edit)</div>
                            </div>

                            <ProjectPermissionSelector value={this.state.selectedLeads}
                                                       onChange={this.selectedLeadsChanged} />
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa" aria-hidden="true" /></span>
                                <div className="icon-label">Standard Users (Read and Execute)</div>
                            </div>

                            <ProjectPermissionSelector value={this.state.selectedStandardUsers}
                                                       onChange={this.selectedStandardUsersChanged} />
                        </div>

                        <div className="form-group">
                            <RepositorySelector value={this.state.selectedRepository}
                                                onChange={this.selectedRepositoryChanged} />
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
