import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export default class Home extends React.Component {
    render() {
        return (
            <Jumbotron className="home">
                <h1>Title</h1>
                Welcome! <br />
                <Link to="/login">Login</Link> <br />
                <Link to="/register">Register</Link> <br />
            </Jumbotron>
        );
    }
}

ReactMixin(Home.prototype, addons.LinkedStateMixin);
