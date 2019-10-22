import React, { Component } from 'react';
import './Header.css'
import { parseJwt } from './../../services/auth';
import { Link } from 'react-router-dom'

export default class Header extends Component {

    constructor() {
        super();
        this.state = {
            item1: '',
            item2: '',
            redirectTo1: '',
            redirectTo2: '',
            style: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('usuario-opflix') === null) {
            this.setState({ item2: 'Login' })
            this.setState({ item3: 'Cadastrar' })
            this.setState({ redirectTo2: '/login' })
            this.setState({ redirectTo3: '/cadastro' })
        } else {
            this.setState({ item2: 'Favoritos' })
            this.setState({ item3: parseJwt().Username.split(' ')[0] });
            this.setState({ redirectTo2: '/favoritos' })
            this.setState({ item4: 'Logout' })
            if (parseJwt().Permissao === 'Administrador') {
                this.setState({ item1: 'Dashboard' });
                this.setState({ redirectTo1: '/dashboard' });
            }
        }
    }

    deslogar = () => {
        localStorage.removeItem('usuario-opflix');
        window.location.reload();
    }

    render() {

        return (
            <div className="headerMain" >
                <header className="header" >
                    <nav className="nav" >
                        <h2 className="logo texto" > OPFLIX </h2>
                        <div className="navItems" >
                            <ul className="texto">
                                <li> < Link to={this.state.redirectTo1} className="texto"> {this.state.item1} </Link></li >
                                <li> < Link to={this.state.redirectTo2} className="texto" > {this.state.item2} </Link></li >
                                <li> < Link to={this.state.redirectTo3} className="texto" > {this.state.item3} </Link></li >
                                <li> < Link to={this.state.redirectTo4} className="texto" onClick={this.deslogar} > {this.state.item4} </Link></li >
                                <li> <img to={this.state.imgUser} alt=""></img></li>
                            </ul>
                        </div >
                    </nav>
                </header >
            </div>
        )
    }
}