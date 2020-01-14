import React, { Component, Fragment } from 'react';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Posts from './Posts';
import BlogEditor from './BlogEditor';
import AuthorPage from './AuthorPage';
import SmallPost from '../components/SmallPost';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavItem from "react-bootstrap/NavItem"
import { LinkContainer } from "react-router-bootstrap";
export default class App extends Component {

	state = {
		user: {},
		posts: []
	}

	handleLogin = (user) => {
		this.setState(
			{user}
		)
	}

	getPosts = () => {
		fetch("http://localhost:4000/posts")
		.then(res => res.json())
		.then(posts => this.setState({posts: posts}))
	}

	componentDidMount() {
		this.getPosts()
	}

	logout = (event) => {
		event.preventDefault()
		this.setState({user: {}})
	}

	linksToRender = () => {
		if (this.state.user && this.state.user.id ) {
			return(
				<Fragment>
					<LinkContainer to="/editor"><NavItem>Home</NavItem></LinkContainer>
				</Fragment>
			)
		} else {
			return(
				<Fragment>
					<LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>
					<LinkContainer to="/signup"><NavItem>Sign Up</NavItem></LinkContainer>
				</Fragment>
			)
		}
	}

	routesToRender = () => {
		// if (true ) {
		if (this.state.user && this.state.user.id ) {
			return(
				<Fragment>
					<button onClick={this.logout} >Log Out</button>
					<Route exact path='/editor' render={
						(routerProps) => < BlogEditor {...routerProps} userId={this.state.user.id}/>
						}
					/>
				</Fragment>
			)
		} else {
			return(
				<Fragment>
					<Route exact path='/signup' render={
							(routerProps) => < SignUpPage {...routerProps} handleLogin={this.handleLogin}/>
						}
					/>
					<Route exact path='/login' render={
							(routerProps) => < LoginPage {...routerProps} handleLogin={this.handleLogin}/>
						}
					/>
				</Fragment>
			)
		}
	}

	render() {
		return (
			<div className='app'>
			<Container>
				<Router>
			<Navbar bg="light" variant="light">
				<Nav pullRight>
					<LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
					<LinkContainer to="/posts"><NavItem>Posts</NavItem></LinkContainer>
					{this.linksToRender()}
				</Nav>
			</Navbar>
				<Row className="justify-content-md-center">
				<Col
					md={{ span: 10, offset: 0}}
					xs
					lg={{ span: 8, offset: 0}}
				>
					<Switch>
						<Route path="/posts/:id" render={routerProps => {
							return <SmallPost {...routerProps} posts={this.state.posts}/>
						}} />
						<Route path="/authors/:username" render={routerProps => {
							return <AuthorPage {...routerProps}/>
						}} />
						<Route exact path='/posts'	render={
								(routerProps) => < Posts {...routerProps} posts={this.state.posts}
								/>
							}
						/>
						{this.routesToRender()}
					</Switch>
				</Col>
				</Row>
				</Router>
			</Container>
			</div>

		);
	};

};