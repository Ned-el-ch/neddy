import React, { Component } from 'react';

export default class Heading1 extends Component {
	render() {
		return (
			<h1 className="Draftail-block--header-one">
				<div className="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
					<span dangerouslySetInnerHTML={{__html: this.props.data}}></span>
				</div>
			</h1>
		);
	}
}