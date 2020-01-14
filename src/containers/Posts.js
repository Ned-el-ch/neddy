import React, { Component, Fragment } from 'react';
import SmallPost from '../components/SmallPost';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Route } from 'react-router-dom';
import PostsList from './PostsList';
export default class Posts extends Component {

	render() {
		return (
			<Container className="Login">
				<Row className="justify-content-md-center">
					<Col
						md={{ span: 10, offset: 0}}
						xs
						lg={{ span: 8, offset: 0}}
					>
						{/* {this.renderPostLinks()} */}
						<PostsList posts={this.props.posts} user={this.props.user} />
						<Route exact path={this.props.match.url} render={() => <h3>Choose a post from the list above</h3>}/>
						{/* {this.debugMe()} */}
						{/* <Route path={`${this.props.match.url}/:postId`} render={
							() => <SmallPost
										postData={
											this.props.posts.find(element => element.id === this.props.match.postId)
										}
										/> 
							} */}
						{/* /> */}
						
					</Col>
				</Row>
			</Container>
		);
	};
};