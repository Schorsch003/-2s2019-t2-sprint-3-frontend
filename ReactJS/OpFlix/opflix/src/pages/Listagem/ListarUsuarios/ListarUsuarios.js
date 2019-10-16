import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import './ListaUsuarios.css'

export default class ListarUsuarios extends Component {

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
        fetch('http://localhost:5000/api/usuarios',
            {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
            })
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
                            <th className="idHeader tabelaInfo">#</th>
                            <th className="tabelaInfo">Nome</th>
                            <th className="tabelaInfo" >Email</th>
                            <th className="tabelaInfo">Data Nascimento</th>
                            <th className="tabelaInfo">Permissao</th>
                            <th className="tabelaInfo">Imagem</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.listaCat.map(x => {
                        console.log(x);
                        return (
                            <tr className="valoresTabela">
                                <td className="idsTabela tabelaInfo">{x.idUsuario}</td>
                                <td className="nomesTabela tabelaInfo">{x.nome}</td>
                                <td className="emailTabela tabelaInfo">{x.email}</td>
                                <td className="dataNascimentoTabela tabelaInfo">{x.dataNascimento}</td>
                                <td className="permissaoTabela tabelaInfo">{x.idPermissaoNavigation.tipo}</td>
                                <td className="tabelaInfo imagemTabela "><img src={x.imagem} alt={x.nome} /> </td>
                            </tr>
                        );
                    })}</tbody>
                </table>
                <Footer />
            </div>
        );
    }
}