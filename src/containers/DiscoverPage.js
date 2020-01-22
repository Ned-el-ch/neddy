import React, { Component, Fragment } from 'react';
import SmallPost from '../components/SmallPost';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Route } from 'react-router-dom';
import PostsList from './PostsList';
import CategoryDiscover from '../components/CategoryDiscover';
export default class DiscoverPage extends Component {

	render() {
		return (
			<div className="discover-page-container">
				<span className="discover-prompt">Explore categories to follow!</span>
				<div className="discover-page">
					{this.props.categories.map(catData => <CategoryDiscover data={catData}/>)}
				</div>
			</div>
		);
	};
};