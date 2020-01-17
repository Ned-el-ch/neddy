import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './like.json'

export default class Like extends Component {

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
			<div className="lottie lottie-like" onClick={this.props.toggleLike}>
				<Lottie
					options={defaultOptions}
					height={85}
					width={85}
					isStopped={!this.props.active}
					isPaused={!this.props.active}
					speed={!this.props.active ? -1 : 1}
				/>
			</div>
		)
	}
}