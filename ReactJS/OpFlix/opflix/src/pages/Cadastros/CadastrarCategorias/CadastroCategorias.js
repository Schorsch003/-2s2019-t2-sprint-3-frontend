import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import Axios from 'axios';

export default class CadastroCategorias extends Component {

    constructor() {
        super();
        this.state = {
            username: "Username",
            nomeCat: ''

        }
    }

    cadastrarCat = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:5000/api/categorias', {
            nome: this.state.nomeCat
        }, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
        }).catch(erro => console.log(erro));
    }

    changeNome = (event) => {
        event.preventDefault();
        this.setState({ nomeCat: event.target.value })
    }
    render() {
        return (
            <div className="mainCadastroCat">
                <Header item1="Favoritos" item2={this.state.username} />
                <Titulo titulo="Cadastrar Usuário" />
                <div className="formInfos">
                    <form method="POST" >
                        <input type="text" placeholder="Nome da Categoria" onChange={this.changeNome} />
                        <input type="submit" value="CADASTRAR" className="submitBtn" onClick={this.cadastrarCat} />
                    </form>
                    <p className="erro">{this.state.erro}</p>
                </div>

                <Footer />
            </div>
        )
    }
}