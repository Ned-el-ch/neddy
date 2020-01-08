import React, { Component } from 'react';
import PrismEditor from './PrismEditor';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

export default class App extends Component {

	state = {

		user: {}

	}

	handleLogin = (user) => {

		this.setState(
			{user}
		)

	}

	render() {

		return (

			<div className='app'>
				<Router>
					<Link to="/" exact>Home</Link><br/>
					<Link to="/login" exact>Login Page</Link><br/>
					<Link to="/signup" exact>Signup Page</Link><br/>
					<Link to="/editor" exact>Editor Page</Link><br/>

					<Route exact path='/signup' component={SignUpPage} />
					<Route exact path='/login' component={LoginPage} />
					<Route exact path='/editor' component={PrismEditor} />

				</Router>

			</div>

		);

	};

};