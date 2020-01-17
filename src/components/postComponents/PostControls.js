import React, { Component } from 'react';
import Like from '../../lotties/Like';
import Star from '../../lotties/Star';

export default class PostControls extends Component {
	render() {
		return (
			<div className="post-controls">
				<Like active={this.props.isLiked} toggleLike={this.props.toggleLike}/>
				<Star active={this.props.isFavorited} toggleFavorite={this.props.toggleFavorite}/>
			</div>
		);
	}
}