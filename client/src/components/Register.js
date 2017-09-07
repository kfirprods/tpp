import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Jumbotron, Button, InputGroup } from 'react-bootstrap';

export default class Register extends React.Component {

    constructor(props) {
        super(props);

        this.register = this.register.bind(this);
        this.state = {
            username: '',
            password: ''
        };
    }

    register(e) {
        e.preventDefault();

        // TODO: Axios
    }

    render() {
        return (
            <Jumbotron className="login">
                <h1>Signup</h1>
                <form role="form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <InputGroup type="text" valueLink={this.linkState('username')} className="form-control" id="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <InputGroup type="password" valueLink={this.linkState('password')} className="form-control" id="password" ref="password" placeholder="Password" />
                    </div>
                    <Button type="submit" onClick={this.register}>Register</Button>
                </form>
            </Jumbotron>
        );
    }
}

ReactMixin(Register.prototype, addons.LinkedStateMixin);