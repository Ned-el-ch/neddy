import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './programming.json'
import Row from "react-bootstrap/Row"

export default class Programming extends Component {

	render(){

		const defaultOptions = {
			loop: true,
			autoplay: true, 
			animationData: animationData,
			rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice'
			}
		};

		return(
			<Row className="align-self-start justify-content-center">
				<Lottie options={defaultOptions}
						height={600}
						width={600}
				/>
			</Row>
		)
	}
}