import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { parseJwt } from './services/auth';


import Dashboard from './pages/Dashboard/Dashboard';

import * as serviceWorker from './serviceWorker';
import ListarCategorias from './pages/Listagem/ListarCategorias/ListarCategorias';
import ListarUsuarios from './pages/Listagem/ListarUsuarios/ListarUsuarios';
import ListarLancamentos from './pages/Listagem/ListarLancamentos/ListarLancamentos';
import CadastroUsuario from './pages/Cadastros/CadastrarUsuarios/CadastroUsuario';
import CadastroLancamento from './pages/Cadastros/CadastrarLancamentos/CadastroLancamentos';
import CadastroCategoria from './pages/Cadastros/CadastrarCategorias/CadastroCategorias';
import Favoritos from './pages/Favoritos/Favoritos';

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

const RotaAdmin = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem('usuario-opflix') !== null && parseJwt().Permissao === 'Administrador' ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
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
                <RotaAdmin path="/dashboard" component={Dashboard} />
                <Route path="/cadastro" component={Cadastro} />
                <RotaPrivada path="/favoritos" component={Favoritos} />
                <RotaAdmin path="/listarcategorias" component={ListarCategorias} />
                <RotaAdmin path="/listarusuarios" component={ListarUsuarios} />
                <RotaAdmin path="/listarlancamentos" component={ListarLancamentos} />
                <RotaAdmin path="/cadastrarusuario" component={CadastroUsuario} />
                <RotaAdmin path="/cadastrarlancamento" component={CadastroLancamento} />
                <RotaAdmin path="/cadastrarcategoria" component={CadastroCategoria} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
