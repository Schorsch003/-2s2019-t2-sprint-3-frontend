import React, { Component } from 'react';
import logoFace from '../../assets/imgs/facebook-logo.png'
import logoTwitter from '../../assets/imgs/twitter-logo.png'
import './Footer.css'
import { Link } from 'react-router-dom'


export default class Footer extends Component {
    render() {
        return (
            <footer className="mainFooter flex">
                <div className="infoFooter">
                    <h3> Email de contato</h3>
                    <p>opflix.contato@email.com</p>
                </div>
                <div className="socialFooter">
                    <Link to="https://facebook.com/netflixbrasil" target="#"><img src={logoFace} id="fblogo" alt="Facebook" /></Link>
                    <Link to="https://twitter.com/netflixbrasil" target="#"><img src={logoTwitter} id="twitterlogo" alt="Twitter" /></Link>
                </div>
            </footer>
        );
    }
}