import React, { Component } from 'react';
import Header from './../../components/Header/Header'
import Titulo from './../../components/Título/Titulo'
import Footer from './../../components/Footer/Footer'
import './App.css';
import { parseJwt } from './../../services/auth'
import Axios from 'axios';


class App extends Component {

  constructor() {
    super();
    this.state = {
      lancamentos: [],
      lancamentoBuscado: [],
      lancamentosFav: []
    }
  }



  componentDidMount() {
    this.recuperarLancamentos();
    if (localStorage.getItem('usuario-opflix') !== null) {
      this.recuperarFavoritos();
    }
  }

  recuperarFavoritos = () => {
    fetch('http://localhost:5000/api/lancamentos/fav/' + parseJwt().jti)
      .then(x => x.json())
      .then(x => this.setState({ lancamentosFav: x }))
      .catch(error => console.log(error))
  }

  adicionarFavorito = (event) => {
    event.preventDefault();
    if (localStorage.getItem('usuario-opflix') !== null) {
      let idLancamento = event.target.value;
      Axios.post('http://localhost:5000/api/usuarios/fav/' + idLancamento, idLancamento, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix') }
      })
        .then(() => alert('Lançamento favoritado com sucesso!'))
        .catch(erro => console.log(erro));
    } else {
      alert('É necessário estar logado para favoritar um lançamento');
      this.props.history.push('/login');
    }
  }

  recuperarLancamentos = () => {
    fetch('http://localhost:5000/api/lancamentos')
      .then(x => x.json())
      .then(x => this.setState({ lancamentos: x }))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div className="appMain" >
        <Header item1="Login" item2="Cadastro" redirectTo1="/login" redirectTo2="/cadastro" />
        <Titulo titulo="Lançamentos" />
        {this.state.lancamentos.map(x => {
          let tipo;
          if (x.idTipoNavigation.nome === 'Filme') {
            tipo = 'min'
          } else if (x.idTipoNavigation.nome === 'Série') {
            tipo = 'eps'
          }
          return (
            <div key={x.idLancamento} className="lancamentos flex">
              <img src={x.imagem} alt={x.titulo} />
              <div className="info">
                <div className="flex tituloLanc">
                  <h3>{x.titulo}</h3>
                  {(this.state.lancamentosFav.includes(x)) ? (
                    <button value={x.idLancamento} onClick={this.removerFavorito}>Desfavoritar</button>
                  ) : (
                      <button value={x.idLancamento} onClick={this.adicionarFavorito}>Favoritar</button>
                    )
                  }
                </div>
                <div className="flex divided">
                  <p>Tempo de duração: {x.tempoDuracao} {tipo}</p>
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

export default App;
