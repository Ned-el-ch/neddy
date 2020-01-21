import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './check.json'

export default class Check extends Component {

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
			<div className={this.props.origin ? "lottie lottie-check-category" : "lottie lottie-check"} onClick={this.props.toggleLike}>
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