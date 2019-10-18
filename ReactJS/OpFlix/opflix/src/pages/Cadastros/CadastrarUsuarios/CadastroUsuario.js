import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import './CadastroUsuario.css'
import Axios from 'axios';

export default class CadastroUsuario extends Component {

    constructor() {
        super();
        this.state = {
            username: "Username",
            nome: '',
            email: '',
            emailConf: '',
            senha: '',
            senhaConf: '',
            dataNascimento: '',
            erro: ''
        }
    }

    changeNome = (event) => {
        this.setState({ nome: event.target.value })
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changeEmailConf = (event) => {
        this.setState({ emailConf: event.target.value })
    }

    changeSenha = (event) => {
        this.setState({ senha: event.target.value })
    }

    changeSenhaConf = (event) => {
        this.setState({ senhaConf: event.target.value })
    }

    changeDataNascimento = (event) => {
        this.setState({ dataNascimento: event.target.value })
    }

    cadastrarUsuario = (event) => {
        event.preventDefault();
        if (this.state.email !== this.state.emailConf) {
            this.setState({ erro: 'Erro: os emails não são iguais' })
        } else if (this.state.senha !== this.state.senhaConf) {
            this.setState({ erro: 'Erro: as senhas não são iguais' })
        } else {
            console.log('tá no axios')
            Axios.post('http://localhost:5000/api/cadastro', {
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
                dataNascimento: this.state.dataNascimento,  
            }, {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
                })
                .catch(erro => console.log(erro))
        }
    }

    render() {
        return (
            <div className="mainCadastroCat">
                <Header item1="Favoritos" item2={this.state.username} />
                <Titulo titulo="Cadastrar Usuário" />
                <div className="formInfos">
                    <form method="POST" >
                        <div className="flex">
                            <div className="col col1">
                                <input type="text" placeholder="NOME" onChange={this.changeNome} />
                                <input type="text" placeholder="EMAIL" onChange={this.changeEmail} />
                                <input type="text" placeholder="CONFIRMAR EMAIL" onChange={this.changeEmailConf} />
                            </div>
                            <div className="col col2">
                                <input type="date" placeholder="DATA DE NASCIMENTO" onChange={this.changeDataNascimento} />
                                <input type="password" placeholder="SENHA" onChange={this.changeSenha} />
                                <input type="password" placeholder="CONFIRMAR SENHA" onChange={this.changeSenhaConf} />
                            </div>
                        </div>
                        <input type="submit" value="CADASTRAR" className="submitBtn" onClick={this.cadastrarUsuario} />
                    </form>
                    <p className="erro">{this.state.erro}</p>
                </div>

                <Footer />
            </div>
        )
    }
}