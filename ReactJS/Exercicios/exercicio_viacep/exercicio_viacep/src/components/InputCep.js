import React, { Component } from 'react';
import Axios from 'axios';

class InputCep extends Component {

    constructor() {

        super();
        this.state = {
            url: '',
            lista: []
        }
    }

    construirTabela = (event) => {
        event.preventDefault();
        fetch('https://viacep.com.br/ws/' + this.state.url + '/json/')
            .then(x => x.json())
            .then(x => this.setState({ lista: x }));
}

getCpf = (event) => {
    this.setState({ url: event.target.value })
}

cadastrarEndereco = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/api/endereco', {
        nome:'user',
        logradouro:this.state.lista.logradouro,
        complemento:this.state.lista.complemento,
        bairro:this.state.lista.bairro,
        localidade:this.state.lista.localidade,
        uf:this.state.lista.uf,
        cep:this.state.url
    })
    .catch(erro => console.log(erro))
    console.log('passou')
}


render() {

    return (
        <div className="construirTabela">
            <form >
                <input
                    placeholder="CEP"
                    type="number"
                    onChange={this.getCpf}
                    value={this.state.url}
                />
                
                <input
                    type="submit"
                    value="Autocompletar informações"
                    onClick={this.construirTabela}
                />

                <input
                    placeholder="Logradouro"
                    value={this.state.lista.logradouro}
                    disabled
                />
                <input
                    placeholder="Complemento"
                    value={this.state.lista.complemento == null ? this.state.lista.complemento : 'Nenhum'}
                    disabled
                />

                <input
                    placeholder="Bairro"
                    value={this.state.lista.bairro}
                    disabled
                />
                <input
                    placeholder="Localidade"
                    value={this.state.lista.localidade}
                    disabled
                />
                <input
                    placeholder="UF"
                    value={this.state.lista.uf}
                    disabled
                />
                <input 
                type="submit"
                onClick={this.cadastrarEndereco}
                />

            </form>
        </div>
    )
}
}

export default InputCep;