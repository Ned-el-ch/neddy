import React, { Component } from 'react';
import Category from '../components/postComponents/Category';
import randKey from "../concerns/randomKey"
export class PostCategories extends Component {

	renderCategories = () => {

		return this.props.categories.map(category => {
			return(<Category category={category} key={randKey()}/>)
		})

	}
	render() {
		return (
			<div className="post-category-container">
				{this.renderCategories()}
			</div>
		);
	}
}