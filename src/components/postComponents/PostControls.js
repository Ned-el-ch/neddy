import React, { Component } from 'react';
import Like from '../../lotties/Like';
import Star from '../../lotties/Star';

export default class PostControls extends Component {


	render() {
		return (
			<div className="post-controls">
				
				{/* PASS IN WHETHER A POST IS LIKED/FAVORTEID OR NOT TO RENDER THE THINGY*/}
				<Like active={false}/>
				<Star active={false}/>
			</div>
		);
	}
}