import React, { Component } from 'react';


export default class ListaDashboard extends Component {
    render() {
        return (
            <div className="Lista">
                <h3> {this.props.nome}</h3>
                <button href={this.props.listar}> Listar</button>
                <button to={this.props.cadastrar}> Cadastrar</button>
            </div>
        );
    }
}