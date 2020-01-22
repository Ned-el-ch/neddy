import React, { Component } from 'react';
import Dino from '../lotties/ErrorPage';
import Programming from '../lotties/Programming';
import SmallPost from "../components/SmallPost"
export default class HomeFeed extends Component {

	componentDidMount() {
		this.props.getFeed()
	}
	
	componentWillUnmount() {
		console.log("will unmount")
	}
	
	render() {
		return (
			<div className="home-feed-page">
				{this.props.feed.map(post => {
					return(<SmallPost postData={post} user={this.props.user} open={false}/>)
				})}
				{this.props.user && this.props.feed.length > 0 ? null : <Programming />}
			</div>
		);
	}
}