import React, { Component } from 'react';

export default class Unstyled extends Component {
	render() {
		return (
			<div>
				<p
					className="Draftail-block--unstyled"
					dangerouslySetInnerHTML={
						{__html: this.props.data}
					}
				></p>
			</div>
		);
	}
}