import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Jumbotron, Button } from 'react-bootstrap';
import axios from 'axios';


export default class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: ""
        };
    }

    // This will be called when the user clicks on the login button
    login(e) {
        e.preventDefault();

        axios.post('/login', {
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
                <h1>Login</h1>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" valueLink={this.linkState('user')} className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
                    </div>
                    <Button type="submit" onClick={this.login.bind(this)}>Submit</Button>
                </form>
            </Jumbotron>
        );
    }
}

ReactMixin(Login.prototype, addons.LinkedStateMixin);