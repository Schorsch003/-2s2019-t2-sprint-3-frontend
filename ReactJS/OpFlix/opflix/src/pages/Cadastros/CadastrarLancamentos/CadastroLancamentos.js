import React, { Component } from 'react'
import Header from '../../../components/Header/Header';
import Titulo from '../../../components/Título/Titulo';
import Footer from '../../../components/Footer/Footer';
import './CadastroLancamentos.css'
// import Axios from 'axios';

export default class CadastroLancamento extends Component {

    constructor() {
        super();
        this.state = {
            username: "Username",
            listaCat: [],
            listaTipo: [],
            listaPlataforma: [],
            erro: ''
        }
    }

    componentDidMount() {
        this.recuperarCategorias();
        this.recuperarTipos();
        this.recuperarPlats();
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

        console.log(event.target.value);
    }



    render() {
        return (
            <div className="mainCadastroCat">
                <Header item1="Favoritos" item2={this.state.username} />
                <Titulo titulo="Cadastrar Lançamento" />
                <div className="formInfos">
                    <form method="POST" >
                        <div className="flex">
                            <div className="col col1">
                                <input type="text" placeholder="Titulo" onChange={this.changeTitulo} />
                                <select onChange={this.changeCategoria}>
                                    <option selected disabled> Categoria</option>
                                    {this.state.listaCat.map(x => {
                                        return (
                                            <option value={x.idCategoria}>{x.nome}</option>
                                        );
                                    })}
                                </select>
                                <select onChange={this.changeTipo}>
                                    <option selected disabled> Tipo</option>
                                    {this.state.listaTipo.map(x => {
                                        return (
                                            <option>{x.nome}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col col2">
                                <input type="number" placeholder="DURAÇÃO(MIN)" onChange={this.changeDuracao} />
                                <input type="date" placeholder="DATA DE ESTREIA" onChange={this.changeEstreia} />
                                <select onChange={this.changePlataforma}>
                                    <option selected disabled> Plataforma</option>
                                    {this.state.listaPlataforma.map(x => {
                                        return (
                                            <option>{x.nome}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <input type="text" className="descricao" placeholder="Descrição" onChange={this.changeDescricao}/>
                        <input type="submit" value="CADASTRAR" className="submitBtn" onClick={this.cadastrarUsuario} />
                    </form>
                    <p className="erro">{this.state.erro}</p>
                </div>

                <Footer />
            </div>
        )
    }
}