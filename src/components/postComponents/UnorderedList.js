import React, { Component } from 'react';

export default class UnorderedList extends Component {

	renderListItems = () => {

		const liArray = this.props.data
		// debugger;
		return liArray.map((element, index) => {
			return (<li className="
			Draftail-block--unordered-list-item
			public-DraftStyleDefault-unorderedListItem
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
			<ul className="public-DraftStyleDefault-ul">
				{this.renderListItems()}
			</ul>
		);
	}
}