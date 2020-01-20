import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';
import Loading from '../lotties/Loading';

export default class AuthorPage extends Component {
	state = {
		posts: null
	}
	getPosts = () => {
		// console.log(`https://agile-journey-79048.herokuapp.com/user/${this.props.match.params.username}`)
		fetch(`https://agile-journey-79048.herokuapp.com/api/v1/posts/${this.props.match.params.username}`)
		.then(res => res.json())
		.then(posts => this.setState({posts}))
		.catch(console.log)

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
			return (<Loading />)
		} else if (this.state.posts.status == 404) {
			return (<h3>There doesn't seem to be anything here damn</h3>)
		} else {
			if (this.state.posts.length === 0) {
				return(<h3>This category doesn't have any posts yet</h3>)
			} else {
				// debugger
				return this.state.posts.map(postData => {
					return (<SmallPost postData={postData} user={this.props.user} open={false}/>)
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