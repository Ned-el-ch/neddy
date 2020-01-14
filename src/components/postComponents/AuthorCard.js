import React, { Component } from 'react';

export default class AuthorCard extends Component {
	render() {
		return (
			<div className="author-card">
				<h2>{this.props.author.name}</h2>
				<p>{this.props.author.bio}</p>
			</div>
		);
	}
}