import React, { Component } from 'react';

export default class PostComment extends Component {
	render() {
		const {content, user} = this.props.comment
		return (
			
			<div className="user-comment">
				{user.name}
				<br/>
				{content}
			</div>
		);
	}
}