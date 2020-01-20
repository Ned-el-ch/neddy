import React, { Component, Fragment } from 'react';
import PostComment from "../components/postComponents/PostComment"

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"

export default class Comments extends Component {

	renderComments = () => {
		return this.props.comments.map(comment => {
			return(
				<PostComment comment={comment}/>
			)
		})
	}


	render() {
		return (
			<div>
				<div className="new-comment-field">
					<Form onSubmit={this.props.handleSubmit}>
						<Form.Row>
							<Form.Group controlId="commentInput">
								<InputGroup>
									<Form.Control
										type="text"
										placeholder="Comment"
										aria-describedby="inputGroupPrepend"
										required
									/>
									<Form.Control.Feedback type="invalid">
										Please input a comment.
									</Form.Control.Feedback>
								<Button type="submit">Submit Comment</Button>
								</InputGroup>
							</Form.Group>
						</Form.Row>
					</Form>
				</div>
				<div className="comments">
					{
					this.props.comments.length > 0
					?
					this.renderComments()
					:
					<div className="comments-placeholder">
						Be the first to comment on this post!
					</div>
					}
				</div>
			</div>
		);
	}
}