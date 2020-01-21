import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';
import Loading from '../lotties/Loading';
import FollowButton from "../components/FollowCategory"

export default class CategoryPage extends Component {
	state = {
		posts: null,
		open: false,
		followers: [],
		isFollowed: false
	}
	getPosts = () => {
		fetch(`https://agile-journey-79048.herokuapp.com/category/${this.props.match.params.title}`)
		.then(res => res.json())
		.then(res => this.setState({posts: res.posts, open: false, followers: res.users}))
		.then(this.setFollowing)
		.catch(console.log)
	}

	setFollowing = () => {
		if (this.props.user) {
			let userIsFollowing = this.state.followers.find(follower => follower.id === this.props.user.id)
			if (userIsFollowing) {
				this.setState({isFollowed: true})
			} else {
				this.setState({isFollowed: false})
			}
		}
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

	toggleFollow = () => {
		this.setState({isFollowed: !this.state.isFollowed})
		fetch(`https://agile-journey-79048.herokuapp.com/${this.state.isFollowed ? "un" : ""}follow_category`,{
			method: 'POST',
			headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage["token"]}`
			},
			body: JSON.stringify({
				category: {
						user_id: this.props.user.id,
						title: this.props.match.params.title
				}
			})
		})
		.then(res => res.json())
		.then(res => {
			// debugger
			if (res.message === "already following") {
				console.log(res)
				this.setState({isFollowed: true})
			} else if (res.message === "you weren't following in the first place") {
				console.log(res)
				this.setState({isFollowed: false})
			} else {
				console.log(res)
				if (res.response) {
					this.setState({followers: [...this.state.followers, {follower: this.props.user.username}]})
				} else {
					this.setState({followers: [...this.state.followers].slice(0, this.state.followers.length -1)})
				}
				this.setState({isFollowed: res.response})
			}
		})
	}
	
	render() {
		return (
			<div className="category-page">
			<div className="category-title-container">
				<span className="category-title">{this.props.match.params.title.toUpperCase()}</span>
				{this.props.user && this.props.match.params.username !== this.props.user.username
					?
					<FollowButton
						isFollowed={this.state.isFollowed}
						toggle={this.toggleFollow}
					/>
					:
					null
				}
				<div className="follow-data">
					<span className="followers">{this.state.followers.length} followers</span>
				</div>
				</div>
				{this.renderPosts()}
			</div>
		);
	}
}