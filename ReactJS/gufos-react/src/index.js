import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './pages/Home/App.js';
import Categorias from './pages/Categorias/Categorias.js';
import Eventos from './pages/Eventos/Eventos.js';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado.js';
import Login from './pages/Login/Login.js';

import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';


const RotaPrivada = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem('usuario-gufos') !== null ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )

            }
            />
)

//routes

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <RotaPrivada path='/categorias' component={Categorias} />
                <RotaPrivada path='/eventos' component={Eventos} />
                <Route exact path='/login' component={Login} />
                <Route component={NaoEncontrado} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
