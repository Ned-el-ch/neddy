import React, { Component, Fragment } from 'react';
import PostComment from "../components/postComponents/PostComment"
export default class Comments extends Component {

	renderComments = () => {
		return this.props.comments.map(comment => {
			return(
				<PostComment comment={comment}/>
			)
		})
	}
	render() {
		return (
			<Fragment>
				{this.renderComments()}
			</Fragment>
		);
	}
}