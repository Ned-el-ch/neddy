import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './dino.json'
import Row from "react-bootstrap/Row"

class Dino extends Component {

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
				<Lottie
					options={defaultOptions}
					height={400}
					width={400}
				/>
				<div className="not-found-page-text">That page is in another castle</div>
			</Row>
		)
	}
 }
 
 export default Dino