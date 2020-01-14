import React, { Component } from 'react';

export default class PostControls extends Component {
	render() {
		return (
			<div className="post-controls">
				<div className="post-like post-action" onClick={this.props.toggleLike}>
					<div className={`post-like-symbol`}>{this.props.isLiked ? "♥" : "♡"}</div>
				</div>
				<div className="post-favorite post-action" onClick={this.props.toggleFavorite}>
					<span className="post-favorite-symbol">{this.props.isFavorited ? "★" : "☆"}</span>
				</div>
			</div>
		);
	}
}