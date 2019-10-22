import React, { Component } from 'react';
import Header from './../../components/Header/Header'
import Titulo from './../../components/Título/Titulo'
import Footer from './../../components/Footer/Footer'
import { parseJwt } from '../../services/auth';

export default class Favoritos extends Component {

    constructor() {
        super();
        this.state = {
            lancamentos: []
        }
    }

    componentDidMount() {
        this.recuperarLancamentos();
    }

    recuperarLancamentos = () => {
        fetch('http://localhost:5000/api/lancamentos/fav/' + parseJwt().jti)
            .then(x => x.json())
            .then(x => this.setState({ lancamentos: x }))
            .catch(error => console.log(error))
    }

    render() {
        console.log(this.state.lancamentos)
        return (

            <div className="appMain" >
                <Header item1="Login" item2="Cadastro" redirectTo1="/login" redirectTo2="/cadastro" />
                <Titulo titulo="Lançamentos" />
                <div className="filtros flex">
                    <input type="text" placeholder="Buscar Lançamentos" onChange={this.getTituloBusca} />
                    <select>
                        <option selected disabled>Filtrar por</option>
                    </select>
                </div>
                {this.state.lancamentos.map(x => {
                    // let tipo;
                    // if (x.idTipoNavigation.nome === 'Filme') {
                    //     tipo = 'min'
                    // } else if (x.idTipoNavigation.nome === 'Série') {
                    //     tipo = 'eps'
                    // }
                    return (
                        <div key={x.idLancamento} className="lancamentos flex">
                            <img src={x.imagem} alt={x.titulo} />
                            <div className="info">
                                <div className="flex tituloLanc">
                                    <h3>{x.titulo}</h3>
                                    <button >Favoritar</button>
                                </div>
                                <div className="flex divided">
                                    <p>Tempo de duração: {x.tempoDuracao + ' min'}</p>
                                    <p>Gênero: {x.idCategoriaNavigation.nome}</p>
                                </div>
                                <p>Disponível em: {x.plataformaNavigation.nome}</p>
                                <p>Sinopse:</p>
                                <p>{x.sinopse}</p>
                            </div>
                        </div>
                    );
                })}
                <Footer />
            </div>

        );
    }
}