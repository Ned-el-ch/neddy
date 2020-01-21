import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';
import Loading from '../lotties/Loading';
import Programming from '../lotties/Programming';

export default class CategoryPage extends Component {
	state = {
		posts: null,
		open: false,
		followers: []
	}
	getPosts = () => {
		fetch(`https://agile-journey-79048.herokuapp.com/category/${this.props.match.params.title}`)
		.then(res => res.json())
		.then(res => this.setState({posts: res.posts, open: false, followers: res.users}))
		.catch(console.log)
	}

	componentDidMount() {
		// debugger
		this.getPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.title !== prevProps.match.params.title) {
			// debugger
			this.getPosts()
			window.scrollTo(0, 0)
			// this.setState({open: false})

		}
	}

	renderPosts = () => {

		if (!this.state.posts) {
			return (<Loading />)
		} else if (this.state.posts.status >= 400 || this.state.posts.error) {
			return (<h3>There doesn't seem to be anything here damn</h3>)
		} else {
			// debugger
			if (this.state.posts.length === 0) {
				return(<h3>This category doesn't have any posts yet</h3>)
			} else {
				return this.state.posts.map(postData => {
					// debugger
					return (<SmallPost postData={postData} user={this.props.user} open={this.state.open}/>)
				})
			}
		}
	}
	
	render() {
		return (
			<div>
				<h1>{this.props.match.params.title.toUpperCase()}</h1>
				{/* <Programming /> */}
				{this.renderPosts()}
			</div>
		);
	}
}