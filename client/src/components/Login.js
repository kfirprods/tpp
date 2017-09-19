import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';

import { usernameValidators, passwordValidators } from '../validators/authentication';
import { textFieldStyle } from '../styles/forms';
import AuthenticationActions from '../actions/AuthenticationActions';
import LoginStore from '../stores/LoginStore';


export default class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            errorMessage: "",
            isLoggedIn: false
        };

        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
        this.loginStoreChangeListener = this.loginStoreChangeListener.bind(this);
    }

    componentDidMount() {
        LoginStore.addChangeListener(this.loginStoreChangeListener);
    }

    loginStoreChangeListener() {
        this.setState({
            errorMessage: LoginStore.errorMessage,
            isLoggedIn: LoginStore.isLoggedIn
        });
    }

    handleUsernameChanged(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChanged(e) {
        this.setState({ password: e.target.value });
    }

    // This will be called when the user clicks on the login button
    login(e) {
        e.preventDefault();

        axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        }).then(function (response) {
            AuthenticationActions.loginUser();
        }).catch(function (error) {
            if (error.response.status === 401) {
                // handle bad login
                AuthenticationActions.loginFailed(error.response.data.message);
            }
            else if (error.response.status === 500) {
                // handle server error
                AuthenticationActions.loginFailed(error.response);
            }
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (<Redirect to="/projects" />);
        }

        return (
            <Jumbotron className="login">
                <h1>Login</h1>
                <form role="form">
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
                        <label className="error">{this.state.errorMessage}</label>
                    </div>
                    <Button type="submit" onClick={this.login.bind(this)}>Submit</Button>
                </form>
            </Jumbotron>
        );
    }
}

ReactMixin(Login.prototype, addons.LinkedStateMixin);