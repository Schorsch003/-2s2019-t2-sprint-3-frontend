import React, { Component } from 'react';


export default class ListaDashboard extends Component {
    render() {
        return (
            <div className="Lista">
                <h3> {this.props.nome}</h3>
                <button> <a href={this.props.listar}> Listar </a></button>
                <button> <a href={this.props.cadastrar}> Cadastrar </a></button>
            </div>
        );
    }
}