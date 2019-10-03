import React, { Component } from 'react'
import Footer from '../../components/Rodape'
import Titulo from '../../components/Titulo'
import logo from '../../assets/img/icon-login.png'
import Axios from 'axios';

export default class Eventos extends Component {

    constructor() {
        super();
        this.state = {
            listaEventos: [],
            listaCategorias: [],
            eventoCadastrar: []
        }
    }

    componentDidMount() {
        this.listarEventos();
        this.listarCategorias();
    }

    listarCategorias = () => {
        fetch('http://192.168.7.85:5000/api/categorias')
            .then(x => x.json())
            .then(x => this.setState({ listaCategorias: x }))
    }

    listarEventos = () => {

        Axios.get('http://192.168.7.85:5000/api/eventos')
            .then(x => {
                this.setState({ listaEventos: x.data })
            })
            .catch(erro => console.log(erro))
    }

    getTitulo = (event) => {
        this.setState({ eventoCadastrar: { ...this.state.eventoCadastrar, titulo: event.target.value } })
    }

    getLocalizacao = (event) => {
        this.setState({ eventoCadastrar: { ...this.state.eventoCadastrar, localizacao: event.target.value } })
    }
    getDataEvento = (event) => {
        this.setState({ eventoCadastrar: { ...this.state.eventoCadastrar, dataEvento: event.target.value.substr(0,10) } })
    }
    getAtivo = (event) => {
        this.setState({ eventoCadastrar: { ...this.state.eventoCadastrar, ativo: event.target.value === 1 ? true : false } })
    }
    getCategoria = (event) => {
        this.setState({ eventoCadastrar: { ...this.state.eventoCadastrar, idCategoria: event.target.value } })
    }
    getDescricao = (event) => {
        this.setState({ eventoCadastrar: { ...this.state.eventoCadastrar, descricao: event.target.value } })
    }

    cadastrarEvento = (event) => {
        event.preventDefault();
        let evento = this.state.eventoCadastrar;
        console.log(evento);
        Axios.post('http://192.168.7.85:5000/api/eventos', {
            titulo:this.state.eventoCadastrar.titulo,
            descricao:this.state.eventoCadastrar.descricao,
            localizacao:this.state.eventoCadastrar.localizacao,
            ativo:this.state.eventoCadastrar.ativo,
            dataEvento:this.state.eventoCadastrar.dataEvento,
            idCategoria:this.state.eventoCadastrar.idCategoria
        })
        .then(x => console.log(x))
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <header className="cabecalhoPrincipal">
                    <div className="container">
                        <img src={logo} alt="" />

                        <nav className="cabecalhoPrincipal-nav">
                            Administrador
                    </nav>
                    </div>
                </header>

                <main className="conteudoPrincipal">
                    <section className="conteudoPrincipal-cadastro">
                        <Titulo titulo="Eventos" />
                        <div className="container" id="conteudoPrincipal-lista">
                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Evento</th>
                                        <th>Data</th>
                                        <th>Acesso Livre</th>
                                        <th>Tipo do Evento</th>
                                    </tr>
                                </thead>

                                <tbody id="tabela-lista-corpo">{this.state.listaEventos.map(x => {
                                    return (
                                        <tr key={x.idEvento}>
                                            <td value={x.idEvento}>{x.idEvento}</td>
                                            <td value={x.titulo}>{x.titulo}</td>
                                            <td value={x.dataEvento}>{x.dataEvento.substr(0,10)}</td>
                                            <td value={x.ativo}>{(x.ativo) ? 'Sim' : 'Não'}</td>
                                            <td value={x.idCategoriaNavigation.nome}>{x.idCategoriaNavigation.nome}</td>
                                        </tr>
                                    )
                                })}</tbody>
                            </table>
                        </div>
                        <div className="container" id="conteudoPrincipal-cadastro">
                            <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                            <div className="container">

                                <input type="text" id="evento__titulo" placeholder="título do evento" onChange={this.getTitulo} />
                                <input type="text" id="evento__localizacao" placeholder="localização" onChange={this.getLocalizacao}/>
                                <input type="date" id="evento__data" placeholder="dd/MM/yyyy" onChange={this.getDataEvento}/>
                                <select id="option__acessolivre" onChange={this.getAtivo}>
                                    <option value="1">Ativo</option>
                                    <option value="0">Desativo</option>
                                </select>
                                <select id="option__tipoevento" onChange={this.getCategoria}>
                                    <option value="0" disabled>Categoria do Evento</option>
                                    {this.state.listaCategorias.map(x => {
                                        return (
                                            <option key={x.idCategoria} value={x.idCategoria}>{x.nome}</option>
                                        )
                                    })}
                                </select>
                                <textarea rows="3" cols="50" placeholder="descrição do evento" id="evento__descricao" onChange={this.getDescricao}></textarea>

                            </div>
                            <button className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro" onClick={this.cadastrarEvento}>Cadastrar</button>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        )
    }
}

