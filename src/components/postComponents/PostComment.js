import React, { Component } from 'react';

export default class PostComment extends Component {
	render() {
		const {content, user} = this.props.comment
		return (
			
			<div>
				{user.name}
				<br/>
				{content}
			</div>
		);
	}
}