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
		}).reverse()
	}

	inputField = () => {
		return(
			<div className="new-comment-field">
				<Form onSubmit={this.props.handleSubmit} className="comment">
					<Form.Row className="comment-input-row">
						<Form.Group controlId="commentInput" className="comment">
							<InputGroup className="comment">
								<Form.Control
									type="text"
									placeholder="Add a new comment..."
									aria-describedby="inputGroupPrepend"
									required
								/>
								<Form.Control.Feedback type="invalid">
									Please input a comment.
								</Form.Control.Feedback>
								<Button type="submit" className="comment-submit">Submit</Button>
							</InputGroup>
						</Form.Group>
					</Form.Row>
				</Form>
			</div>
		)
	}

	render() {
		return (
			<Fragment>
				<span className="comments-title">Comments</span>
				{this.props.userId ? this.inputField() : null}
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
			</Fragment>
		);
	}
}