import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';

import { emailValidators, usernameValidators, passwordValidators } from '../../validators/authentication';
import { textFieldStyle } from '../../styles/forms';
import AuthenticationActions from '../../actions/AuthenticationActions';
import RegisterStore from '../../stores/RegisterStore';


export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            registrationSucceeded: false,
            errorMessage: '',
            fieldErrors: []
        };

        this.register = this.register.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.registerStoreChangeListener = this.registerStoreChangeListener.bind(this);
    }

    componentDidMount() {
        RegisterStore.addChangeListener(this.registerStoreChangeListener);
    }

    registerStoreChangeListener() {
        this.setState({
            errorMessage: RegisterStore.errorMessage,
            registrationSucceeded: RegisterStore.registrationSucceeded,
            fieldErrors: RegisterStore.fieldErrors
        });
    }

    handleUsernameChanged(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    handleEmailChanged(e) {
        this.setState({ email: e.target.value });
    }

    register(e) {
        e.preventDefault();

        axios.post('/register', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then(function (response) {
            AuthenticationActions.registerUser();
        }).catch(function (error) {
            if (error.response.status === 400) {
                var validationErrorMessages = [];
                for (let validationError of error.response.data.errors) {
                    validationErrorMessages.push(validationError.messages.join(", "));
                }

                AuthenticationActions.registrationForbidden(validationErrorMessages);
            }
            else if (error.response.status === 401) {
                // handle registration
                AuthenticationActions.registrationFailed(error.response.data.message);
            }
            else if (error.response.status === 403) {
                // handle forbidden input
                var errors = error.response.data.errors;
                var fieldErrors = [];
                for (var errorFieldName in errors) {
                    if (errors.hasOwnProperty(errorFieldName)) {
                        fieldErrors.push(errors[errorFieldName].message);
                    }
                }

                AuthenticationActions.registrationForbidden(fieldErrors);
            }
            else if (error.response.status === 500) {
                // handle server error
                AuthenticationActions.registrationFailed(error.response.data.message);
            }
        });
    }

    render() {
        if (this.state.registrationSucceeded) {
            return (<Redirect to="/projects" />);
        }

        return (
            <div className="container">
                <div className="main-center auth-container">
                    <h1 className="title text-center">Sign Up</h1>
                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true" /></span>
                                <div className="icon-label">Email</div>
                            </div>

                            <ReactTextField type="email"
                                            style={textFieldStyle}
                                            onChange={this.handleEmailChanged}
                                            className="form-control"
                                            placeholder="Email"
                                            validators={emailValidators} />
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true" /></span>
                                <div className="icon-label">Username</div>
                            </div>

                            <ReactTextField type="text"
                                            style={textFieldStyle}
                                            onChange={this.handleUsernameChanged}
                                            className="form-control"
                                            placeholder="Username"
                                            validators={usernameValidators} />
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa" aria-hidden="true" /></span>
                                <div className="icon-label">Password</div>
                            </div>

                            <ReactTextField type="password"
                                            style={textFieldStyle}
                                            onChange={this.handlePasswordChanged}
                                            className="form-control"
                                            placeholder="Password"
                                            validators={passwordValidators} />
                        </div>
                        <div className="form-group">
                            <ul className="errorsList">
                                {this.state.fieldErrors.map(function(errorMessage, index) {
                                    return <li key={index}>{errorMessage}</li>
                                })}
                            </ul>
                        </div>
                        <Button className="btn btn-primary btn-lg btn-block login-button" type="submit" onClick={this.register}>Register</Button>
                    </form>
                </div>
            </div>
        );
    }
}

ReactMixin(Register.prototype, addons.LinkedStateMixin);