import React, { Component } from 'react';
import { Link } from "react-router-dom"

export default class CategoryDiscover extends Component {
	render() {
		return (
			<span className="discover-category-item">
				<Link to={`/category/${this.props.data.label}`}>{this.props.data.label}</Link>
			</span>
		);
	}
}