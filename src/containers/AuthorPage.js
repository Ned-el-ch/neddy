import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';

export default class AuthorPage extends Component {
	state = {
		posts: []
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

	renderPosts = () => {
		if (this.state.posts.length === 0) {
			return (<h3>Loading posts hehe</h3>)
		} else {
			// debugger
			return this.state.posts.map(postData => {
				return (<SmallPost postData={postData} user={this.props.user}/>)
			})
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