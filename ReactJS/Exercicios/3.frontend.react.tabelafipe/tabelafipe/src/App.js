import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      listaMarcas: [],
      listaCarros: {
        modelos:[]
      }
    }
  }

  componentDidMount() {
    this.recuperarMarcas();
  }


  recuperarMarcas = () => {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      .then(x => x.json())
      .then(x => this.setState({ listaMarcas: x }));
  }

  setIdMarca = (event) => {
    // this.setState({ idSelecionado:  })
    console.log(event.target.value)
    // console.log(this.state.idSelecionado)
    this.recuperarModelos(event.target.value)
    
    
  }

  recuperarModelos = (id) => {
    fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas/' + id + '/modelos')
      .then(x => x.json())
      .then(x => this.setState({listaCarros: x}));
  }
  // this.setState({ listaCarros: x })



  render() {
    return (
      <div className="App" >
        <select onChange={this.setIdMarca}>
          <option selected disabled>Marcas</option>
          {this.state.listaMarcas.map(x => {
            return (
              <option key={x.codigo} value={x.codigo} >{x.nome}</option>
            );
          })}
        </select>
        <select>
          <option selected disabled>Modelos</option>
          {this.state.listaCarros.modelos.map(x => {
            return (
              <option key={x.codigo}>{x.nome}</option>
            )
          })}
        </select>
      </div>
    );
  }
}

export default App;
