import React, { Component } from 'react';
import './App.css';
import Axios from 'axios'

class App extends Component {

  constructor() {
    super();
    this.state = {
      listaEstilos: [],
      nomeEstilo: ''
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch('http://localhost:5000/api/estilos')
      .then(x => x.json())
      .then(x => this.setState({ listaEstilos: x }))
  }

  getNomeEstilo = (event) => {
    event.preventDefault();
    this.setState({ nomeEstilo: event.target.value })
  }

  postEstilo = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/api/estilos', {
      nome: this.state.nomeEstilo
    }, {
        'Content-Type': 'application/json'
      })
      .catch(erro => console.log(erro))
  }



  render() {
    return (
      <div className="App" >
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Estilo</th>
            </tr>
          </thead>
          <tbody>
            {this.state.listaEstilos.map(x => {
              return (
                <tr>
                  <td>{x.idEstilo}</td>
                  <td>{x.nome}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
        <form>
          <input type="text" placeholder="Nome" onChange={this.getNomeEstilo} />
          <button onClick={this.postEstilo}>Submit</button>
        </form>

      </div>
    );
  }
}

export default App;
