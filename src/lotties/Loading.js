import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './loading.json'
import Row from "react-bootstrap/Row"

class Loading extends Component {

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
						height={250}
						width={250}
				/>
			</Row>
		)
	}
 }
 
 export default Loading