import React, { Component, Fragment } from 'react';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Posts from './Posts';
import BlogEditor from './BlogEditor';
import AuthorPage from './AuthorPage';
import HomeFeed from './HomeFeed';
import SmallPost from '../components/SmallPost';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavItem from "react-bootstrap/NavItem"
import NavLink from "react-bootstrap/NavLink"
import { LinkContainer } from "react-router-bootstrap";
export default class App extends Component {

	state = {
		user: null,
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
					<LinkContainer to="/editor">
						<NavLink><NavItem>Editor</NavItem></NavLink>
					</LinkContainer>
					<button onClick={this.logout} className='logout'>Log Out</button>
				</Fragment>
			)
		} else {
			return(
				<Fragment>
					<LinkContainer to="/login">
						<NavLink><NavItem>Login</NavItem></NavLink>
					</LinkContainer>
					<LinkContainer to="/signup">
						<NavLink><NavItem>Sign Up</NavItem></NavLink>
					</LinkContainer>
				</Fragment>
			)
		}
	}

	routesToRender = () => {
		if (this.state.user && this.state.user.id ) {
			return(
				<Fragment>
					<Route exact path='/editor' render={
						(routerProps) => < BlogEditor {...routerProps} userId={this.state.user.id} user={this.state.user}/>
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
			<div className='app'><Container fluid><Router>
				
				<Navbar bg="light" variant="light" fixed>
					<Nav fluid collapseOnSelect>
						<LinkContainer to="/">
							<NavLink><Navbar.Brand>
							<NavItem>Home</NavItem>
							</Navbar.Brand></NavLink>
						</LinkContainer>
						<Navbar.Collapse>
						<LinkContainer to="/posts">
							<NavLink><NavItem>Posts List</NavItem></NavLink>
						</LinkContainer>
						{this.linksToRender()}
						</Navbar.Collapse>
					</Nav>
				</Navbar>
				<br/>
				<Row className="justify-content-md-center">
					<Col  xs sm md lg={7} xl={5}>
						<Switch>
							<Route path="/posts/:id" render={routerProps => {
								return <SmallPost {...routerProps} posts={this.state.posts} user={this.state.user}/>
							}} />
							<Route path="/authors/:username" render={routerProps => {
								return <AuthorPage {...routerProps} user={this.state.user}/>
							}} />
							<Route exact path='/posts'	render={
									(routerProps) => < Posts {...routerProps} posts={this.state.posts} user={this.state.user}
								/>
								}
							/>
							<Route exact path='/' render={
								(routerProps) => < HomeFeed {...routerProps} user={this.state.user}/>
								}
							/>
							{this.routesToRender()}
						</Switch>
					</Col>
				</Row>
			</Router></Container></div>
		);
	};
};