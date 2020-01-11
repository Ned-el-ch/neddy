import React, { Component } from 'react';

export default class Heading3 extends Component {
	render() {
		return (
			<h3 className="Draftail-block--header-three" key={this.props.index}>
				<div className="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
					<span dangerouslySetInnerHTML={{__html: this.props.data}}></span>
				</div>
			</h3>
		);
	}
}