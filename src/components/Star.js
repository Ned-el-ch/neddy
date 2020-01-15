import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './star.json'

class Star extends Component {
	state = {
		isStopped: true
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
			<div className="lottie lottie-star">
				<Lottie options={defaultOptions}
					height={100}
					width={100}
					isStopped={this.state.isStopped}
					onClick={() => this.setState({isStopped: !this.state.isStopped})}
				/>
			</div>
		)
	}
 }
 
 export default Star