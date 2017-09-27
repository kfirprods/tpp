import React from 'react';
import ReactMixin from 'react-mixin';
import addons from 'react-addons';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export default class Home extends React.Component {
    render() {
        return (
            <div id="page-top">
                <Navbar fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#page-top">tpp</a>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav pullRight bsStyle="pills">
                        <NavItem>
                            <Link to="/login">Login</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/register">Register</Link>
                        </NavItem>
                    </Nav>
                </Navbar>

                <header className="masthead">
                    <div className="intro-body">
                        <div className="container">
                            <div className="row">
                                <h1 className="brand-heading">tpp</h1>
                                <p className="intro-text">Textual Post Processing
                                <br />Automate your project's textual processing</p>
                                <a href="#about" className="btn btn-circle js-scroll-trigger">
                                    <i className="fa fa-angle-double-down animated" />
                                </a>
                            </div>
                        </div>
                    </div>
                </header>

                <section id="aboutSection" className="content-section text-center">
                    <div className="container">
                        <div className="row">
                            <div>
                                <h2 id="about">About tpp</h2>
                                <p>
                                    Some text here
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

ReactMixin(Home.prototype, addons.LinkedStateMixin);
