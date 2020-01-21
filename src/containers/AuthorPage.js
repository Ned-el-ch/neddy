import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';
import Loading from '../lotties/Loading';
import FollowButton from "../components/FollowButton"
export default class AuthorPage extends Component {
	state = {
		posts: null,
		isFollowed: false,
		followers: [],
		following: []
	}
	getPosts = () => {
		// console.log(`https://agile-journey-79048.herokuapp.com/user/${this.props.match.params.username}`)
		fetch(`https://agile-journey-79048.herokuapp.com/api/v1/posts/${this.props.match.params.username}`)
		.then(res => res.json())
		.then(res => this.setState({posts: res.posts, followers: res.passive_relationships, following: res.active_relationships}))
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
				return(<h3>This author doesn't have any posts yet</h3>)
			} else {
				// debugger
				return this.state.posts.map(postData => {
					return (<SmallPost postData={postData} user={this.props.user} open={false} match={this.props.match}/>)
				})
			}
		}
	}

	toggleFollow = () => {
		this.setState({isFollowed: !this.state.isFollowed})
		fetch(`https://agile-journey-79048.herokuapp.com/${this.state.isFollowed ? "un" : ""}follow`,{
			method: 'POST',
			headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage["token"]}`
			},
			body: JSON.stringify({
				relationship: {
						follower_username: this.props.user.username,
						followed_username: this.props.match.params.username
				}
			})
		})
		.then(res => res.json())
		.then(res => {
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
			<div className="author-page">
				<span className="author-title">{this.props.match.params.username}'s page</span>
				{this.props.user && this.props.match.params.username !== this.props.user.username
				?
				<FollowButton
					follower={this.props.user.username}
					followed={this.props.match.params.username}
					isFollowed={this.state.isFollowed}
					toggle={this.toggleFollow}
				/>
				:
				null
				}
				<div className="follow-data">
					<span className="followers">{this.state.followers.length} followers</span>
					<span className="following">{this.state.following.length} following</span>
				</div>
				{this.renderPosts()}
			</div>
		);
	}
}