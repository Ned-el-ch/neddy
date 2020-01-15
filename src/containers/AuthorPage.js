import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';

export default class AuthorPage extends Component {
	state = {
		posts: null
	}
	getPosts = () => {
		// console.log(`http://localhost:4000/user/${this.props.match.params.username}`)
		fetch(`http://localhost:4000/api/v1/posts/${this.props.match.params.username}`)
		.then(res => res.json())
		.then(posts => this.setState({posts}))
		// .then(this.renderPosts())
	}

	componentDidMount() {
		this.getPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.username !== prevProps.match.params.username) {
			this.getPosts()
		}
	}

	renderPosts = () => {
		if (!this.state.posts) {
			return (<h3>Loading posts hehe</h3>)
		} else if (this.state.posts.status == 404) {
			return (<h3>There doesn't seem to be anything here damn</h3>)
		} else {
			if (this.state.posts.length === 0) {
				return(<h3>This category doesn't have any posts yet</h3>)
			} else {
				return this.state.posts.map(postData => {
					return (<SmallPost postData={postData} user={this.props.user}/>)
				})
			}
		}
	}
	
	render() {
		return (
			<div>
				<h1>{this.props.match.params.username}'s page</h1>
				{this.renderPosts()}
			</div>
		);
	}
}