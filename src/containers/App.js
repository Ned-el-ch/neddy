import React, { Component } from 'react';
import PrismEditor from './PrismEditor';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';

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

				{/* < SignUpPage /> */}
				< LoginPage handleLogin={this.handleLogin}/>
				< PrismEditor />
	
			</div>
	
		);

	};

};