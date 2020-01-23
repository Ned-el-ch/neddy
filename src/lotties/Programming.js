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
			// rendererSettings: {
			// preserveAspectRatio: 'xMidYMid slice'
			// }
		};

		return(
			<div>
				<div className="neddy-subheading">Blogging. <span className="simplified">Simplified.</span></div>
				<div className="programming-lottie">
					<Lottie options={defaultOptions}
							// height={400}
							// width={400}
					/>
				</div>
			</div>
		)
	}
}