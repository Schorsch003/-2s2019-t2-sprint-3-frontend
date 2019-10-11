import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';


import Dashboard from './pages/Dashboard/Dashboard';

import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/cadastro" component={Cadastro} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
