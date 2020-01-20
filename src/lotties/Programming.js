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
			<div>
				{/* <div className="neddy-heading">Neddy</div> */}
				<div className="neddy-subheading">Blogging. <span className="simplified">Simplified.</span></div>
				<Row className="align-self-start justify-content-center">
					<Lottie options={defaultOptions}
							height={600}
							width={600}
					/>
				</Row>
			</div>
		)
	}
}