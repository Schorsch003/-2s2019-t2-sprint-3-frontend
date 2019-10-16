import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import './ListaCategorias.css'

export default class ListarCategorias extends Component {

    constructor() {
        super();
        this.state = {
            username: "Username",
            listaCat: []
        }
    }

    componentDidMount() {
        this.getCategorias();
    }

    getCategorias = () => {
        fetch('http://localhost:5000/api/categorias')
            .then(x => x.json())
            .then(x => this.setState({ listaCat: x }))
            .catch(error => console.log(error))
    }


    render() {

        return (
            <div className="mainListaCat">
                <Header item1="Favoritos" item2={this.state.username} />
                <Titulo titulo="Categorias" />
                <table className="tabelaCategorias">
                    <thead>
                        <tr className="tabelaHeader">
                            <th className="idHeader">#</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.listaCat.map(x => {
                        return(
                            <tr className="valoresTabela">
                                <td className="idsTabela">{x.idCategoria}</td>
                                <td className="nomesTabela">{x.nome}</td>
                            </tr>
                        );
                    })}</tbody>
                </table>
                <Footer />
            </div>
        );
    }
}