import React, { Component } from 'react';
import Check from '../lotties/Check';

export default class FollowButton extends Component {

	render() {
		return (
			<div onClick={this.props.toggle} className="follow-category-button">
				<Check active={this.props.isFollowed} origin={this.props.origin}/>
				<span className={this.props.isFollowed ? "follow-text-true" : "follow-text-false"}>
					{this.props.isFollowed ? "Following" : "Follow"}
				</span>
			</div>
		);
	}

}