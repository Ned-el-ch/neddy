import React, { Component, Fragment } from 'react';
import PrismEditor from './PrismEditor';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom'
import Posts from './Posts';

export default class App extends Component {

	state = {

		user: {}

	}

	handleLogin = (user) => {

		this.setState(
			{user}
		)

	}

	logout = (event) => {

		event.preventDefault()
		this.setState({user: {}})

	}

	pagesToRender = () => {

		if (this.state.user.id ) {

			return(

				<Fragment>
					<Link to="/editor" exact>Editor Page</Link><br/>
					<button onClick={this.logout} >Log Out</button>
					<Route exact path='/editor' component={PrismEditor} />
				</Fragment>

			)

		} else {

			return(

				<Fragment>
					<Link to="/login" exact>Login Page</Link><br/>
					<Link to="/signup" exact>Signup Page</Link><br/>
					<Route exact path='/signup' component={SignUpPage} />
					<Route exact path='/login' render={(routerProps) => < LoginPage {...routerProps} handleLogin={this.handleLogin}/>} />
				</Fragment>

			)
		}



	}

	render() {

		return (

			<div className='app'>

				<Router>
					
					<Link to="/" exact>Home</Link><br/>
					<Link to="/posts" exact>Posts</Link><br/>
					
					{this.pagesToRender()}
					
					<Route exact path='/' component={Posts} />
					<Route exact path='/posts' component={Posts} />

				</Router>

			</div>

		);

	};

};