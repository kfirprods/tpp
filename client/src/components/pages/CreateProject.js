import React from 'react';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { projectNameValidators } from '../../validators/project';
import { textFieldStyle } from '../../styles/forms';
import ProjectPermissionSelector from '../atomic/ProjectPermissionSelector';
import RepositorySelector from '../atomic/RepositorySelector';
import ProjectRuleSelector from '../atomic/ProjectRuleSelector';


const PROJECT_USER_PERMISSIONS = {
    FULL: "Full Permissions",
    READ_EXECUTE_EDIT: "Read, Execute, Edit",
    READ_EXECUTE: "Read and Execute",
};

function packPermissions(users, permission) {
    return users.map((user) => {
        return {username: user.username, permission: permission};
    });
}


export default class CreateProject extends React.Component {
    constructor() {
        super();
        this.state = {
            projectId: -1,
            projectName: "",
            selectedAdministrators: [],
            selectedLeads: [],
            selectedStandardUsers: [],
            selectedRepository: "",
            selectedRules: []
        };

        this.handleProjectNameChanged = this.handleProjectNameChanged.bind(this);
        this.selectedAdministratorsChanged = this.selectedAdministratorsChanged.bind(this);
        this.selectedLeadsChanged = this.selectedLeadsChanged.bind(this);
        this.selectedStandardUsersChanged = this.selectedStandardUsersChanged.bind(this);
        this.selectedRulesChanged = this.selectedRulesChanged.bind(this);
        this.selectedRepositoryChanged = this.selectedRepositoryChanged.bind(this);
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

    selectedRulesChanged(rules) {
        this.setState({selectedRules: rules});
    }

    createProject(e) {
        e.preventDefault();

        let permissions = packPermissions(this.state.selectedAdministrators, PROJECT_USER_PERMISSIONS.FULL).concat(
            packPermissions(this.state.selectedLeads, PROJECT_USER_PERMISSIONS.READ_EXECUTE_EDIT)
        ).concat(
            packPermissions(this.state.selectedStandardUsers, PROJECT_USER_PERMISSIONS.READ_EXECUTE)
        );

        axios.post('/projects', {
            title: this.state.projectName,
            rules: this.state.selectedRules.map((rule) => rule._id),
            userPermissions: permissions,
            repository: this.state.selectedRepository
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
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
                            <ProjectRuleSelector onChange={this.selectedRulesChanged} />
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
