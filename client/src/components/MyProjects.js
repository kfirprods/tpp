import React from 'react';
import LoginStore from '../stores/LoginStore';
import { Link } from 'react-router-dom';

export default class MyProjects extends React.Component {
    constructor() {
        super();

        this.state = this._getLoginState();
    }

    _getLoginState() {
        return {
            userLoggedIn: LoginStore.isLoggedIn()
        };
    }

    componentDidMount() {
        this.changeListener = this._onChange.bind(this);
        LoginStore.addChangeListener(this.changeListener);
    }

    _onChange() {
        this.setState(this._getLoginState());
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this.changeListener);
    }

    render() {
        return (
            <div>Test</div>
        );
    }

    logout(e) {
        e.preventDefault();

        // TODO: Axios
    }

    get headerItems() {
        if (!this.state.userLoggedIn) {
            return (
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="login">Login</Link>
                        </li>
                        <li>
                            <Link to="signup">Signup</Link>
                        </li>
                    </ul>
                </div>       )
        } else {
            return (
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <Link to="home">Home</Link>
                        </li>
                        <li>
                            <a href="" onClick={this.logout}>Logout</a>
                        </li>
                    </ul>
                </div>
            )
        }
    }
}