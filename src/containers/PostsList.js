import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';

export default class PostsList extends Component {

	renderPostLinks = () => {
		return this.props.posts.map((postData) => {
			return (
				<Fragment>
					<Link key={postData.id} to={`/posts/${postData.id}`}>Post number {postData.id}</Link>
					<br/>
				</Fragment>
			)
		})
	}

	render() {
		return (
			<Fragment>
				{this.renderPostLinks()}
			</Fragment>
			);
	}
}