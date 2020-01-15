import React, { Component, Fragment } from 'react'
import Lottie from 'react-lottie'
import animationData from './like.json'

class Like extends Component {
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
			<div className="lottie lottie-like">
				<Lottie options={defaultOptions}
						height={100}
						width={100}
						isStopped={this.state.isStopped}
						onClick={() => this.setState({isStopped: false})}
				/>
			</div>
		)
	}
 }
 
 export default Like