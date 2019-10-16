import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import './ListaLancamentos.css'

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
                        </tr>
                    </thead>
                    <tbody>{this.state.listaLanc.map(x => {
                        console.log(x);
                        if(x.idTipoNavigation.nome === 'Filme'){
                            tipoTempo = 'min'
                        }else {
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
                            </tr>
                        );
                    })}</tbody>
                </table>
                <Footer />
            </div>
        );
    }
}