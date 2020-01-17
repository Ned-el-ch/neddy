import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './star.json'

export default class Star extends Component {

	render(){
 
		const defaultOptions = {
			loop: false,
			autoplay: false, 
			animationData: animationData,
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			}
		};

		return(
			<div className="lottie lottie-star" onClick={this.props.toggleFavorite}>
				<Lottie options={defaultOptions}
					height={110}
					width={110}
					isStopped={!this.props.active}
					isPaused={!this.props.active}
					speed={!this.props.active ? -1 : 1}
				/>
			</div>
		)
	}
}