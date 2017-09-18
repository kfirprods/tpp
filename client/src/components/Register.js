import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Jumbotron, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { ReactTextField } from 'react-textfield';

import { emailValidators, usernameValidators, passwordValidators } from '../validators/authentication';
import { textFieldStyle } from '../styles/forms';


export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: ''
        };

        this.register = this.register.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handleUsernameChanged = this.handleUsernameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
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

        // TODO: Flux
        axios.post('/register', {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }).then(function (response) {
            console.log("success", response);
        }).catch(function (error) {
            if (error.response.status === 401) {
                // handle bad login
                console.log(error.response.data.message);
            }
            else if (error.response.status === 500) {
                // handle server error
                console.log("Server error during login", error, error.response);
            }
        });
    }

    render() {
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
                    <Button type="submit" onClick={this.register}>Register</Button>
                </form>
            </Jumbotron>
        );
    }
}

ReactMixin(Register.prototype, addons.LinkedStateMixin);