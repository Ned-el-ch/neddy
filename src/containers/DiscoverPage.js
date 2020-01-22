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
			<div className="discover-page">
				{this.props.categories.map(catData => {
					return(
						<CategoryDiscover data={catData}/>
					)
				})}
			</div>
						// {/* {this.renderPostLinks()} */}
						// <PostsList posts={this.props.posts} user={this.props.user} />
						// <Route exact path={this.props.match.url} render={() => <h3>Choose a post from the list above</h3>}/>
						// {/* {this.debugMe()} */}
						// {/* <Route path={`${this.props.match.url}/:postId`} render={
						// 	() => <SmallPost
						// 				postData={
						// 					this.props.posts.find(element => element.id === this.props.match.postId)
						// 				}
						// 				/> 
						// 	} */}
						// {/* /> */}
					
		);
	};
};