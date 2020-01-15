import React, { Component, Fragment } from 'react';
import Like from '../Like';
import Star from '../Star';

// const PostControls = (props) => {
// 	// const oof = useSpring({opacity: 1, from: {opacity: 0}})
// 	const oof = useSpring({ x: 100, from: { x: 0 } })

// 		return (
// 			<div className="post-controls">
// 				<Fragment>
// 					<div className="post-like post-action">
// 						<div className={`post-like-symbol`}>♡</div>
// 					</div>
// 					<div className="post-favorite post-action">
// 						<animated.svg strokeDashoffset={oof.x}><polygon points="22.5 35.25 8.68704657 42.5118994 11.3250859 27.1309497 0.150171867 16.2381006 15.5935233 13.9940503 22.5 0 29.4064767 13.9940503 44.8498281 16.2381006 33.6749141 27.1309497 36.3129534 42.5118994"></polygon>
// 						</animated.svg>
// 						<span className="post-favorite-symbol"></span>
// 					</div>
// 				</Fragment>
				
// 			</div>
// 		);

// }
// export default PostControls

export default class PostControls extends Component {
	render() {
		return (
			<div className="post-controls">
				<Like />
				<Star />
			</div>

			// <div className="post-controls">
			// 	{this.props.user ? 
			// 	<Fragment>
			// 		<div className="post-like post-action" onClick={this.props.toggleLike}>
			// 			<div className={`post-like-symbol`}>{this.props.isLiked ? "♥" : "♡"}</div>
			// 		</div>
			// 		<div className="post-favorite post-action" onClick={this.props.toggleFavorite}>
			// 			<span className="post-favorite-symbol">{this.props.isFavorited ? "★" : "☆"}</span>
			// 		</div>
			// 	</Fragment>
			// 	:
			// 	<div></div>
			// 	}
			// </div>
		);
	}
}