import React, {Component} from 'react';
import { Route } from 'react-router';
import { Switch, HashRouter } from 'react-router-dom';

import Home from '../home/Home.js';

export default class Routes extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/' component={Home} />
                </Switch>
            </HashRouter>
        );
    }
}
