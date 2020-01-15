import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';

export default class CategoryPage extends Component {
	state = {
		posts: null
	}
	getPosts = () => {
		fetch(`http://localhost:4000/category/${this.props.match.params.id}`)
		.then(res => res.json())
		.then(posts => this.setState({posts}))
		// .catch(error => console.log(error))
	}

	componentDidMount() {
		this.getPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.id !== prevProps.match.params.id) {
			this.getPosts()
		}
	}
	

	renderPosts = () => {

		// this.getPosts()
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
				<h1>Category ### page</h1>
				{this.renderPosts()}
			</div>
		);
	}
}