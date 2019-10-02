import React, { Component } from "react"
import reactdom from 'react-dom'

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
			],
			nome: ""
		}
	}


	componentDidMount() {
		this.listarCategorias();
	}



	cadastrarCategoria = (event) => {
		event.preventDefault();

		fetch('http://192.168.7.85:5000/api/categorias', {
			method: 'POST',
			body: JSON.stringify({ nome: this.state.nome }),
			headers: {
				"Content-Type": "application/json"
			},

		})
			.then(response => this.listarCategorias())
			.catch(error => console.log(error))

	}

	listarCategorias = () => {
		fetch('http://192.168.7.85:5000/api/categorias')
			.then(x => x.json())
			.then(x => this.setState({ lista: x }))
	}

	nomeCategoria = (event) => {
		this.setState({ nome: event.target.value })

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
							<form onSubmit={this.cadastrarCategoria}>
								<div className="container">
									<input
										type="text"
										className="class__categoria"
										id="input__categoria"
										placeholder="tipo do evento"
										value={this.state.nome}
										onChange={this.nomeCategoria}
									/>
									<button
										id="btn__cadastrar"
										className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
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