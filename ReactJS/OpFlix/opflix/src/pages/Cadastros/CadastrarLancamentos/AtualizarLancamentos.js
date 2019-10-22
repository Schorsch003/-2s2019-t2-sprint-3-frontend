import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import './CadastroLancamentos.css'
import Axios from 'axios';

export default class AtualizarLancamento extends Component {

    constructor() {
        super();
        this.state = {
            listaCat: [],
            listaTipo: [],
            listaPlataforma: [],
            idPlataforma: '',
            idCategoria: '',
            idTipo: '',
            titulo: '',
            descricao: '',
            estreia: '',
            duracao: '',
            erro: '',
            lancamentoEncontrado: [],
            dataRecuperada: ''
        }
    }

    componentDidMount() {
        this.recuperarCategorias();
        this.recuperarTipos();
        this.recuperarPlats();
        this.getLancamentoEscolhido();

    }

    recuperarCategorias = () => {
        fetch('http://localhost:5000/api/categorias')
            .then(x => x.json())
            .then(x => this.setState({ listaCat: x }))
            .catch(error => console.log(error));
    }

    recuperarTipos = () => {
        fetch('http://localhost:5000/api/tipo')
            .then(x => x.json())
            .then(x => this.setState({ listaTipo: x }))
            .catch(error => console.log(error));
    }

    recuperarPlats = () => {
        fetch('http://localhost:5000/api/plataformas')
            .then(x => x.json())
            .then(x => this.setState({ listaPlataforma: x }))
            .catch(error => console.log(error));
    }

    changeCategoria = (event) => {
        event.preventDefault();
        this.setState({ idCategoria: event.target.value })
    }

    changeTipo = (event) => {
        event.preventDefault();
        this.setState({ idTipo: event.target.value })
    }

    changePlataforma = (event) => {
        event.preventDefault();
        this.setState({ idPlataforma: event.target.value })
    }

    changeTitulo = (event) => {
        this.setState({ titulo: event.target.value });
    }

    changeDescricao = (event) => {
        this.setState({ descricao: event.target.value });
    }

    changeEstreia = (event) => {
        let isso = event.target.value;
        let tempo = isso.split('T')[0];
        console.log(tempo)
        this.setState({ estreia: tempo });
    }

    changeDuracao = (event) => {

        this.setState({ duracao: event.target.value })
    }

    atualizarLancamento = (event) => {
        event.preventDefault();
        let id = this.state.lancamentoEncontrado.idLancamento;
        Axios.put('http://localhost:5000/api/lancamentos/' + id, {
            titulo: this.state.titulo,
            sinopse: this.state.descricao,
            idTipo: this.state.idTipo,
            idCategoria: this.state.idCategoria,
            dataLancamento: this.state.estreia,
            tempoDuracao: this.state.duracao,
            plataforma: this.state.idPlataforma
        }, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
            })
            .then(() => {
                alert('Lançamento atualizado com sucesso!')
                this.props.history.push('/listarlancamentos');
            })
            .catch(erro => console.log(erro));


    }

    getLancamentoEscolhido = () => {
        let id = localStorage.getItem('idLancamento')
        fetch('http://localhost:5000/api/lancamentos/' + id)
            .then(x => x.json())
            .then(x => {
                this.setState({ lancamentoEncontrado: x })
                this.setState({dataRecuperada: x.dataLancamento.split('T')[0]})
            });
        localStorage.removeItem('idLancamento');
    }


    render() {
        return (
            <div className="mainCadastroCat">
                <Header />
                <Titulo titulo="Cadastrar Lançamento" />
                <div className="formInfos">
                    <form method="POST" >
                        <div className="flex">
                            <div className="col col1">
                                <input defaultValue={this.state.lancamentoEncontrado.titulo} type="text" placeholder="Titulo" onChange={this.changeTitulo} />
                                <select onChange={this.changeCategoria}>
                                    {this.state.listaCat.map(x => {
                                        if (this.state.lancamentoEncontrado.idCategoria === x.idCategoria) {
                                            return (
                                                <option selected value={x.idCategoria}>{x.nome}</option>
                                            );
                                        } else {
                                            return (
                                                <option value={x.idCategoria}>{x.nome}</option>
                                            );
                                        }
                                    })}
                                </select>
                                <select onChange={this.changeTipo}>
                                    <option disabled> Tipo</option>
                                    {this.state.listaTipo.map(x => {
                                        if (this.state.lancamentoEncontrado.idTipo === x.idTipo) {
                                            return (
                                                <option selected value={x.idTipo}>{x.nome}</option>
                                            );
                                        } else {
                                            return (
                                                <option value={x.idTipo}>{x.nome}</option>
                                            );

                                        }
                                    })
                                    }
                                </select>
                            </div>
                            <div className="col col2">
                                <input type="number" defaultValue={this.state.lancamentoEncontrado.tempoDuracao} placeholder="DURAÇÃO(MIN)" onChange={this.changeDuracao} />
                                <input type="date" defaultValue={this.state.dataRecuperada} placeholder="DATA DE ESTREIA" onChange={this.changeEstreia} />
                                <select onChange={this.changePlataforma}>
                                    {this.state.listaPlataforma.map(x => {
                                        if (this.state.lancamentoEncontrado.plataforma === x.idPlataforma) {
                                            return (
                                                <option selected value={x.idPlataforma}>{x.nome}</option>
                                            );
                                        } else {
                                            return (
                                                <option value={x.idPlataforma}>{x.nome}</option>
                                            );

                                        }
                                    })

                                    })}
                                </select>
                            </div>
                        </div>
                        <input type="text" defaultValue={this.state.lancamentoEncontrado.sinopse} className="descricao" placeholder="Descrição" onChange={this.changeDescricao} />
                        <input type="submit" value="ATUALIZAR" className="submitBtn" onClick={this.atualizarLancamento} />
                    </form>
                    <p className="erro">{this.state.erro}</p>
                </div>

                <Footer />
            </div>
        )
    }
}