import React, { Component } from 'react';

export default class Heading4 extends Component {
	render() {
		return (
			<h4 className="Draftail-block--header-four">
				<div className="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
					<span dangerouslySetInnerHTML={{__html: this.props.data}}></span>
				</div>
			</h4>
		);
	}
}