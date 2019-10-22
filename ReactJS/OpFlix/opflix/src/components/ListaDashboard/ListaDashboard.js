import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class ListaDashboard extends Component {
    render() {
        return (
            <div className="Lista">
                <h3> {this.props.nome}</h3>
                <button> <Link to={this.props.listar}> Listar </Link></button>
                <button> <Link to={this.props.cadastrar}> Cadastrar </Link></button>
            </div>
        );
    }
}