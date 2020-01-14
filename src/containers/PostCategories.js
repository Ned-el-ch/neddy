import React, { Component } from 'react';
import Category from '../components/postComponents/Category';

export class PostCategories extends Component {
	render() {
		return (
			<div className="post-category-container">
				<Category/>
				<Category/>
				<Category/>
			</div>
		);
	}
}