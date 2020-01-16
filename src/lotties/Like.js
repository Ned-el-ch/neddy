import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './like.json'

export default class Like extends Component {

	state = {
		isStopped: true,
		isPaused: true,
		speed: -1
	}

	toggle = () => {
		this.setState({
			isStopped: !this.state.isStopped,
			isPaused: !this.state.isStopped,
			speed: this.state.speed * -1
		})
	}

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
			<div className="lottie lottie-like" onClick={this.toggle}>
				<Lottie
					options={defaultOptions}
					height={85}
					width={85}
					isStopped={this.state.isStopped}
					isPaused={this.state.isPaused}
					speed={this.state.speed}
				/>
			</div>
		)
	}
}