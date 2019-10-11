import React, { Component } from 'react'
import Header from './../../components/Header/Header'
import './Login.css';
import Axios from 'axios'
import imgFundo from './../../assets/imgs/joker-login-teste.jpg'

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            itensListaLogin: ["EMAIL", "SENHA"],
            email: '',
            senha: ''
        }
    }

    realizarLogin = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:5000/api/login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(x => {
                if (x.status === 200) {
                    localStorage.setItem('usuario-opflix', x.data.token);
                    this.props.history.push('/dashboard');

                }
            })
    }

    mudarStateEmail = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value });
    }
    mudarStateSenha = (event) => {
        event.preventDefault();
        this.setState({ senha: event.target.value });
    }

    render() {
        return (
            <div className="mainLogin">
                <Header item1="Login" item2="Cadastro" redirectTo1="/login" redirectTo2="/cadastro" />
                <div className="flex">
                    <div className="imagemFundo">
                        <img src={imgFundo} alt="Joker - 2019" />
                    </div>
                    <div className="login">
                        <a href="/" className="voltarAoMain"><p> Voltar ao menu principal </p></a>
                        <form>
                            <input type="text" placeholder={this.state.itensListaLogin[0]} onChange={this.mudarStateEmail} />
                            <input type="text" placeholder={this.state.itensListaLogin[1]} onChange={this.mudarStateSenha} />
                            <input type="submit" value="LOGIN" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}