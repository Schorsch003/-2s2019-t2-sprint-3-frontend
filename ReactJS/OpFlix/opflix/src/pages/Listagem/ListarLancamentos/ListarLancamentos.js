import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import './ListaLancamentos.css'
import Axios from 'axios';

export default class ListarLancamentos extends Component {

    constructor() {
        super();
        this.state = {
            username: "Username",
            listaLanc: []
        }
    }

    componentDidMount() {
        this.getLancamentos();
    }

    getLancamentos = () => {
        fetch('http://localhost:5000/api/lancamentos')
            .then(x => x.json())
            .then(x => this.setState({ listaLanc: x }))
            .catch(error => console.log(error))
    }

    removerLancamento = (event) => {
        // console.log(event.target.value);
        Axios.delete('http://localhost:5000/api/lancamentos/' + event.target.value, {
            headers:{
                'Authorization': 'Bearer' + localStorage.getItem('usuario-opflix')
            }
        });
    }


    render() {
        let tipoTempo;
        return (
            <div className="mainListaLanc">
                <Header item1="Favoritos" item2={this.state.username} />
                <Titulo titulo="Lancamentos" />
                <table className="tabelaLancamentos">
                    <thead>
                        <tr className="tabelaHeader">
                            <th className="idHeader tabelaInfo">#</th>
                            <th className="tabelaInfo">Nome</th>
                            <th className="tabelaInfo">Categoria</th>
                            <th className="tabelaInfo">Tipo</th>
                            <th className="tabelaInfo">Duração</th>
                            <th className="tabelaInfo">Data de Lancamento</th>
                            <th className="tabelaInfo">Plataforma</th>
                            <th className="tabelaInfo">Editar</th>
                            <th className="tabelaInfo">X</th>
                        </tr>
                    </thead>
                    <tbody>{this.state.listaLanc.map(x => {
                        console.log(x);
                        if (x.idTipoNavigation.nome === 'Filme') {
                            tipoTempo = 'min'
                        } else {
                            tipoTempo = 'eps'
                        }
                        return (
                            <tr className="valoresTabela">
                                <td className="idsTabela">{x.idLancamento}</td>
                                <td className="nomesTabela">{x.titulo}</td>
                                <td className="nomesTabela">{x.idCategoriaNavigation.nome}</td>
                                <td className="nomesTabela">{x.idTipoNavigation.nome}</td>
                                <td className="nomesTabela">{x.tempoDuracao + ' ' + tipoTempo}</td>
                                <td className="nomesTabela">{x.dataLancamento}</td>
                                <td className="nomesTabela">{x.plataformaNavigation.nome}</td>
                                <td className="nomesTabela"><a href="#">E</a></td>
                                <td className="nomesTabela"><button value={x.idLancamento} onClick={this.removerLancamento}>X</button></td>
                            </tr>
                        );
                    })}</tbody>
                </table>
                <Footer />
            </div>
        );
    }
}