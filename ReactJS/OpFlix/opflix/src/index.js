import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';


import Dashboard from './pages/Dashboard/Dashboard';

import * as serviceWorker from './serviceWorker';
import ListarCategorias from './pages/Listagem/ListarCategorias/ListarCategorias';
import ListarUsuarios from './pages/Listagem/ListarUsuarios/ListarUsuarios';
import ListarLancamentos from './pages/Listagem/ListarLancamentos/ListarLancamentos';

const RotaPrivada = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem('usuario-opflix') !== null ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/login" component={Login} />
                <RotaPrivada path="/dashboard" component={Dashboard} />
                <Route path="/cadastro" component={Cadastro} />
                <RotaPrivada path="/listarcategorias" component={ListarCategorias} />
                <RotaPrivada path="/listarusuarios" component={ListarUsuarios} />
                <RotaPrivada path="/listarlancamentos" component={ListarLancamentos} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
