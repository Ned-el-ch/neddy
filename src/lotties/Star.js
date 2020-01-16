import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './star.json'

export default class Star extends Component {

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

	componentDidMount() {
		
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
			<div className="lottie lottie-star" onClick={this.toggle}>
				<Lottie options={defaultOptions}
					height={110}
					width={110}
					isPaused={this.state.isPaused}
					isStopped={this.state.isStopped}
					speed={this.state.speed}
				/>
			</div>
		)
	}
}