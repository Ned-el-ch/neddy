import React, { Component } from 'react';
import Dino from '../lotties/ErrorPage';
import Programming from '../lotties/Programming';
import SmallPost from "../components/SmallPost"
export default class HomeFeed extends Component {
	render() {
		return (
			<div className="home-feed-page">
				{this.props.feed.map(post => {
					return(<SmallPost postData={post} user={this.props.user} open={false}/>)
				})}
				{this.props.user ? null :<Programming />}
			</div>
		);
	}
}