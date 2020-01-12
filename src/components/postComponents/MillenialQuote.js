import React, { Component } from 'react';

export default class MillenialQuote extends Component {
	render() {
		return (
				<div className="Draftail-block--millenial-quote">
					<div className="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
						<span dangerouslySetInnerHTML={{__html: this.props.data}}></span>
					</div>
				</div>
		);
	}
}