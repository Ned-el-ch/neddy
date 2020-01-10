import React, { Component } from 'react';
import SmallPost from '../components/SmallPost';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
export default class Posts extends Component {


	render() {

		return (
			<Container className="Login">
				<Row className="justify-content-md-center">
					<Col md={{ span: 8, offset: 0}}>
						{this.props.posts.map(postData => {
							return(< SmallPost postData={postData} key={postData.id}/>)
						})}
					</Col>
				</Row>
			</Container>
		);
	};
};