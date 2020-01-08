import React, { Component } from 'react';

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import "../styles/login.css";

export default class SignUpPage extends Component{

	handleSubmit(event) {

		const form = event.currentTarget;

		if (!form.checkValidity() === false) {

			event.preventDefault();
			event.stopPropagation();

			const name = event.target.elements.validationCustomName.value;
			const username = event.target.elements.validationCustomUsername.value;
			const password = event.target.elements.validationCustomPassword.value;
			const imageUrl = event.target.elements.validationCustomImageUrl.value;
			// FETCH TO THE API TO TRY AND CREATE AN ACCOUNT

			fetch('http://localhost:4000/api/v1/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					user: {
						name: name,
						username: username,
						password: password,
						bio: "'twas in the tutorial, forgot to remove this",
						avatar: imageUrl
					}
				})
			})

			.then(res => res.json())
			.then(console.log)

		}

	}

	render () {

		return (
				<Container className="Login">
				<Row className="justify-content-md-center">
				<Col md={{ span: 5, offset: 0}}>
					<Form onSubmit={this.handleSubmit} >
						<Form.Row>
							<Form.Group as={Col} controlId="validationCustomName">
								<Form.Control
									required
									type="text"
									placeholder="Full Name"
								/>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="validationCustomImageUrl">
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend">👤</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										required
										type="text"
										placeholder="Paste a link to an image pls"
									/>
								</InputGroup>
								<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="validationCustomUsername">
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text id="inputGroupPrepend">🌐</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="text"
										placeholder="Username"
										aria-describedby="inputGroupPrepend"
										required
									/>
									<Form.Control.Feedback type="invalid">
										Please choose a username.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>
						<Form.Row>
							<Form.Group as={Col} controlId="validationCustomPassword">
								<InputGroup>

									<Form.Control
										type="password"
										placeholder="Password"
										aria-describedby="inputGroupPrepend"
										required
									/>
									<Form.Control.Feedback type="invalid">
										Please choose a password.
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>
						<Form.Group>
							<Form.Check
								required
								label="Surrender my soul and morals"
								feedback="You must surrender your soul and morals."
							/>
						</Form.Group>
						<Form.Row>
							<Form.Group >
								<Button type="submit">oof owie signy signy</Button>
							</Form.Group>
						</Form.Row>
					</Form>
				</Col>
				</Row>
				</Container>
		);

	}

}