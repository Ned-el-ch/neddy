import React, { Component } from 'react';

export default class Quote extends Component {
	render() {
		return (
				<blockquote className="Draftail-block--blockquote">
					<div className="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
						<span dangerouslySetInnerHTML={{__html: this.props.data}}></span>
					</div>
				</blockquote>
		);
	}
}