import React, { Component } from 'react';
import Header from './../../components/Header/Header'
import Titulo from './../../components/Título/Titulo'
import Footer from './../../components/Footer/Footer'
import Lista from './../../components/ListaDashboard/ListaDashboard'
import './Dashboard.css'
import { parseJwt } from './../../services/auth';

export default class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            username: ""
        }
    }


    componentDidMount() {   
        console.log(parseJwt());
        this.setState({ username: parseJwt().Username.split(' ')[0] })
    }

    render() {
        return (
            <div>
                <Header item1="Favoritos" item2={this.state.username} />
                <main className="mainDashboard">
                    <Titulo titulo={'Bem vindo, ' + this.state.username} />
                    <div className="listas">
                        <Lista nome="Lançamentos" listar="/listarlancamentos" cadastrar='/cadastrarlancamento' />
                        <Lista nome="Categorias" listar="/listarcategorias" cadastrar='/cadastrarcategoria' />
                        <Lista nome="Usuários" listar="/listarusuarios" cadastrar='/cadastrarusuario' />
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}