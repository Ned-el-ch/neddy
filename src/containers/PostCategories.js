import React, { Component } from 'react';
import Category from '../components/postComponents/Category';

export class PostCategories extends Component {

	renderCategories = () => {

		return this.props.categories.map(category => {
			return(<Category category={category}/>)
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