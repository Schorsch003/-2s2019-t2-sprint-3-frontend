import React, { Component } from 'react';
import logoFace from '../../assets/imgs/facebook-logo.png'
import logoTwitter from '../../assets/imgs/twitter-logo.png'
import './Footer.css'


export default class Footer extends Component {
    render() {
        return (
            <footer className="mainFooter flex">
                <div className="infoFooter">
                    <h3> Email de contato</h3>
                    <p>opflix.contato@email.com</p>
                </div>
                <div className="socialFooter">
                    <a href="https://facebook.com/netflixbrasil" target="#"><img src={logoFace} id="fblogo" alt="Facebook" /></a>
                    <a href="https://twitter.com/netflixbrasil" target="#"><img src={logoTwitter} id="twitterlogo" alt="Twitter" /></a>
                </div>
            </footer>
        );
    }
}