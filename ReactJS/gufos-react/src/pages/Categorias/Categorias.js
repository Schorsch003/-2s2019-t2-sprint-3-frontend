import React, { Component } from "react"

//imagem
import logo from '../../assets/img/icon-login.png';

//components
import Footer from '../../components/Rodape.js'


class Categorias extends Component {

	constructor() {
		super();
		this.state = {
			lista: [
				// { idCategoria: 1, nome: 'Design' },
				// { idCategoria: 2, nome: 'Jogos' },
				// { idCategoria: 3, nome: 'Meetup' }
			]
		}
	}


	componentDidMount() {
		fetch('http://192.168.7.85:5000/api/categorias')
			.then(x => x.json())
			.then(x => this.setState({lista:x}))
	}



	adicionaItem = (event) => {
		event.preventDefault();
		let lista = { idCategoria: 4, nome: 'Nova Categoria' };
		let listaState = this.state.lista;
		listaState.push(lista);
		this.setState({ lista: listaState })
	}

	render() {
		return (
			<div>
				<header className="cabecalhoPrincipal">
					<div className="container">
						<img src={logo} />

						<nav className="cabecalhoPrincipal-nav">
							Administrador
                </nav>
					</div>
				</header>

				<main className="conteudoPrincipal">
					<section className="conteudoPrincipal-cadastro">
						<h1 className="conteudoPrincipal-cadastro-titulo">Categorias</h1>
						<div className="container" id="conteudoPrincipal-lista">
							<table id="tabela-lista">
								<thead>
									<tr>
										<th>#</th>
										<th>Título</th>
									</tr>
								</thead>

								<tbody id="tabela-lista-corpo">
									{this.state.lista.map(x => {
										return (
											<tr key={x.idCategoria}>
												<td>{x.idCategoria}</td>
												<td>{x.nome}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>

						<div className="container" id="conteudoPrincipal-cadastro">
							<h2 className="conteudoPrincipal-cadastro-titulo">
								Cadastrar Categoria
                  </h2>
							<form>
								<div className="container">
									<input
										type="text"
										className="class__categoria"
										id="input__categoria"
										placeholder="tipo do evento"
									/>
									<button
										id="btn__cadastrar"
										className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
										onClick={this.adicionaItem}
									>
										Cadastrar
                      </button>
								</div>
							</form>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		);
	}


}

export default Categorias;