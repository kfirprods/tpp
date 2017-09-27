import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Button } from 'react-bootstrap';
import { ReactTextField } from 'react-textfield';
import { Redirect } from 'react-router';

import { usernameValidators, passwordValidators } from '../../validators/authentication';
import { textFieldStyle } from '../../styles/forms';
import AuthenticationActions from '../../actions/AuthenticationActions';
import LoginStore from '../../stores/LoginStore';


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

    login(e) {
        e.preventDefault();

        AuthenticationActions.loginUser(this.state.username, this.state.password);
    }

    render() {
        if (this.state.isLoggedIn) {
            return (<Redirect to="/projects" />);
        }

        return (
            <div className="container">
                <div className="main-center auth-container">
                    <h1 className="title text-center">Sign In</h1>
                    <form role="form">
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
                            <label className="error">{this.state.errorMessage}</label>
                        </div>
                        <Button className="btn btn-primary btn-lg btn-block login-button"
                                type="submit"
                                onClick={this.login.bind(this)}>Login</Button>
                    </form>
                </div>
            </div>
        );
    }
}

ReactMixin(Login.prototype, addons.LinkedStateMixin);