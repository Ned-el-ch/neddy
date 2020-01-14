import React, { Component, Fragment } from 'react';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Posts from './Posts';
import BlogEditor from './BlogEditor';
import AuthorPage from './AuthorPage';
import SmallPost from '../components/SmallPost';

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

	pagesToRender = () => {
		// if (true ) {
		if (this.state.user && this.state.user.id ) {
			return(
				<Fragment>
					<Link to="/editor" exact>Editor Page</Link><br/>
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
					<Link to="/login">Login Page</Link><br/>
					<Link to="/signup">Signup Page</Link><br/>
					<Route exact path='/signup' render={
							(routerProps) => < SignUpPage {...routerProps} handleLogin={this.handleLogin}/>
						}
					/><br/>
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
				<Router>
					<Link to="/">Home</Link><br/>
					<Link to="/posts">Posts</Link><br/>
					{this.pagesToRender()}
					<Switch>
						<Route path="/posts/:id" render={routerProps => {
							return <SmallPost {...routerProps} posts={this.state.posts}/>
						}} />
						<Route path="/authors/:username" render={routerProps => {
							return <AuthorPage {...routerProps}/>
						}} />
						<Route exact path='/posts'  render={
								(routerProps) => < Posts {...routerProps} posts={this.state.posts}
								/>
							}
						/>
					</Switch>
					<br/>
				</Router>
			</div>
		);
	};

};