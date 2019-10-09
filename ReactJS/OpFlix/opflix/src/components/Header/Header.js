import React, { Component } from 'react';
import './Header.css'


export default class Header extends Component {
    render() {

        return (
            <div className="headerMain" >
                <header className="header" >
                    <nav className="nav" >
                        <h2 className="logo texto" > OPFLIX </h2>
                        <div className="navItems" >
                            <ul className="texto">
                                <li> < a href={this.props.redirectTo1} className="texto"> {this.props.item1} </a></li >
                                <li> < a href={this.props.redirectTo1} className="texto" > {this.props.item2} </a></li >
                            </ul>
                        </div >
                    </nav>
                </header >
            </div>
        )
    }
}