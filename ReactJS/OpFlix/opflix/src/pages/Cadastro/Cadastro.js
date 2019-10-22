import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import './Cadastro.css';
import imgFundo from './../../assets/imgs/it-cadastro-teste.jpg'
import Axios from 'axios';
import { Link } from 'react-router-dom'

export default class Cadastro extends Component {

    constructor() {
        super();
        this.state = {
            itensListaLogin: ["NOME", "DATA DE NASCIMENTO", "EMAIL", "SENHA"],
            nome: '',
            dataNasc: '',
            senha: '',
            email: '',
            msg: ''
        }
    }


    changeNome = (event) => {
        this.setState({ nome: event.target.value });
        console.log(this.state.nome);
    }
    changeDataNasc = (event) => {
        this.setState({ dataNasc: event.target.value });
        console.log(this.state.dataNasc);

    }
    changeEmail = (event) => {
        this.setState({ email: event.target.value });
        console.log(this.state.email);

    }
    changeSenha = (event) => {
        this.setState({ senha: event.target.value });
        console.log(this.state.senha);

    }


    cadastrarUsuario = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:5000/api/cadastro', {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            dataNascimento: this.state.dataNasc
        })
            .then(x => {
                if (x.status === 200) {
                    this.setState({ msg: 'Usuário cadastrado com sucesso!' })
                } else {
                    this.setState({ msg: 'Erro ao cadastrar o usuário!' })
                }
            })
            .catch(erro => console.log(erro))
    }


    render() {
        return (
            <div className="mainLogin">
                <Header item1="Login" item2="Cadastro" redirectTo1="/login" redirectTo2="/cadastro" />
                <div className="flex">
                    <div className="imagemFundo">
                        <img src={imgFundo} alt="Joker - 2019" />
                    </div>
                    <div className="divisoria"></div>
                    <div className="login">
                        <Link to="/" className="voltarAoMain"><p> Voltar ao menu principal </p></Link>
                        <form>
                            <input type="text" placeholder={this.state.itensListaLogin[0]} onChange={this.changeNome} />
                            <input type="date" placeholder={this.state.itensListaLogin[1]} onChange={this.changeDataNasc} />
                            <input type="text" placeholder={this.state.itensListaLogin[2]} onChange={this.changeEmail} />
                            <input type="text" placeholder={this.state.itensListaLogin[3]} onChange={this.changeSenha} />
                            <input type="submit" value="CADASTRAR" onClick={this.cadastrarUsuario}/>
                        </form>
                        <p className="text__login" style={{ color: "red", textAlign: "center" }}> {this.state.msg}</p>
                    </div>
                </div>
            </div>
        );
    }
}