import React, { Component } from 'react'
import Header from '../../components/Header/Header'
import './Cadastro.css';
import imgFundo from './../../assets/imgs/it-cadastro-teste.jpg'

export default class Cadastro extends Component {

    constructor() {
        super();
        this.state = {
            itensListaLogin: ["NOME", "DATA DE NASCIMENTO","EMAIL","SENHA"],
        }
    }



    render() {
        return (
            <div className="mainLogin">
                <Header item1="Login" item2="Cadastro"  redirectTo1="/login" redirectTo2="/cadastro" />
                <div className="flex">
                    <div className="imagemFundo">
                        <img src={imgFundo} alt="Joker - 2019" />
                    </div>
                    <div className="divisoria"></div>
                    <div className="login">
                        <a href="/" className="voltarAoMain"><p> Voltar ao menu principal </p></a>
                        <form>
                            <input type="text" placeholder={this.state.itensListaLogin[0]} />
                            <input type="text" placeholder={this.state.itensListaLogin[1]} />
                            <input type="text" placeholder={this.state.itensListaLogin[2]} />
                            <input type="text" placeholder={this.state.itensListaLogin[3]} />
                            <input type="submit" value="CADASTRAR" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}