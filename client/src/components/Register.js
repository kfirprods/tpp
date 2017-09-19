import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';

import { emailValidators, usernameValidators, passwordValidators } from '../validators/authentication';
import { textFieldStyle } from '../styles/forms';
import AuthenticationActions from '../actions/AuthenticationActions';
import RegisterStore from '../stores/RegisterStore';


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
            console.log("redirectin to /projects");
            // return (<Redirect to="/projects" />);
        }

        return (
            <Jumbotron className="login">
                <h1>Register</h1>
                <form role="form">
                    <div className="form-group">
                        <ReactTextField type="email"
                                        style={textFieldStyle}
                                        onChange={this.handleEmailChanged}
                                        className="form-control"
                                        placeholder="Email"
                                        validators={emailValidators} />
                    </div>
                    <div className="form-group">
                        <ReactTextField type="text"
                                        style={textFieldStyle}
                                        onChange={this.handleUsernameChanged}
                                        className="form-control"
                                        placeholder="Username"
                                        validators={usernameValidators} />
                    </div>
                    <div className="form-group">
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
                    <Button type="submit" onClick={this.register}>Register</Button>
                </form>
            </Jumbotron>
        );
    }
}

ReactMixin(Register.prototype, addons.LinkedStateMixin);