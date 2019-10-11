import React, { Component } from 'react';


export default class ListaDashboard extends Component {
    render() {
        return (
            <div className="Lista">
                <h3> {this.props.nome}</h3>
                <button> Listar</button>
                <button> Cadastrar</button>
            </div>
        );
    }
}