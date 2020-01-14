import React, { Component } from 'react';

export default class AuthorPage extends Component {
	getPosts = () => {
		console.log(`http://localhost:4000/user/${this.props.match.params.username}`)
		// fetch(`http://localhost:4000/user/${this.props.match.params.username}`)
		// .then(res => res.json())
		// .then(posts => this.setState({posts: posts}))
	}
	render() {
		return (
			<div>
				{this.getPosts()}
			</div>
		);
	}
}