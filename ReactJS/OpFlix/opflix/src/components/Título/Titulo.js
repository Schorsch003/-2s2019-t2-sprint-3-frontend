import React, { Component } from 'react'
import './Titulo.css'

export default class Titulo extends Component {
    render(){
        return (
            <div className="mainTitulo">
                <h1 className="titulo">{this.props.titulo}</h1>
            </div>
        );
    }
}