import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyProjects from "./pages/MyProjects";
import CreateProject from "./pages/CreateProject";

export default class AppView extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/projects" component={MyProjects} />
                    <Route exact path="/projects/add" component={CreateProject} />
                </Switch>
            </BrowserRouter>
        );
    }
}
