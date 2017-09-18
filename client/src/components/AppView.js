import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

export default class AppView extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}
