import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './programming.json'
import Row from "react-bootstrap/Row"

export default class Programming extends Component {

	render(){

		const defaultOptions = {
			loop: false,
			autoplay: true, 
			animationData: animationData,
			// rendererSettings: {
			// preserveAspectRatio: 'xMidYMid slice'
			// }
		};

		return(
			<div>
				{/* <div className="neddy-heading">Neddy</div> */}
				<div className="neddy-subheading">Blogging. <span className="simplified">Simplified.</span></div>
				{/* <Row className="align-self-start justify-content-center"> */}
				<div className="programming-lottie">
					<Lottie options={defaultOptions}
							// height={400}
							// width={400}
					/>
				</div>
				{/* </Row> */}
			</div>
		)
	}
}