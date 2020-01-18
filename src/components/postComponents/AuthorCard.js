import React, { Component } from 'react';
import { Link } from "react-router-dom"
export default class AuthorCard extends Component {
	render() {
		return (
			<div className="author-card">
				<Link to={`/authors/${this.props.author.username}`}><h2>{this.props.author.name}</h2></Link>
				<p className="author-bio">{this.props.author.bio}</p>
			</div>
		);
	}
}