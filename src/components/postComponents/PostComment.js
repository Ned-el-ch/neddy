import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import randKey from "../../concerns/randomKey"
export default class PostComment extends Component {
	render() {
		const {content, user} = this.props.comment
		return (
			
			<div className="user-comment">
				<Link to={`/authors/${user.username}`} key={randKey()}>{user.name}</Link>
				<br/>
				{content}
			</div>
		);
	}
}