import React, { Component } from 'react';

export default class OrderedList extends Component {

	renderListItems = () => {

		const liArray = this.props.data
		// debugger;
		return liArray.map((element, index) => {
			return (<li className="
				Draftail-block--ordered-list-item
				public-DraftStyleDefault-reset
				public-DraftStyleDefault-depth0
				public-DraftStyleDefault-listLTR"
				key={index}
			>
				<div className="public-DraftStyleDefault-block public-DraftStyleDefault-ltr">
					<span>{element}</span>
				</div>
			</li>)
		})

	}
	
	render() {
		return (
			<ol className="public-DraftStyleDefault-ol">
				{this.renderListItems()}
			</ol>
		);
	}
}