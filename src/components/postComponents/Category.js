import React, { Component } from 'react';
import { Link } from "react-router-dom"
export default class Category extends Component {
	render() {
		return (
			<div className="post-category">
				<Link to={`/category/${this.props.category.title}`}><span className="post-category-link">{this.props.category.title}</span></Link>
			</div>
		);
	}
}