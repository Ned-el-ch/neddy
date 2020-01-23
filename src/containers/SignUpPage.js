import React, { Component } from 'react';

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import "../styles/login.css";

export default class SignUpPage extends Component{

	state = {
		wrongSignup: false
	}
	handleSubmit = (event) => {
		event.preventDefault();
		const handleLogin = this.props.handleLogin;
		const history = this.props.history;
		const form = event.currentTarget;

		if (!form.checkValidity() === false) {
			const name = event.target.elements.validationCustomName.value;
			const username = event.target.elements.validationCustomUsername.value;
			const password = event.target.elements.validationCustomPassword.value;
			const bio = event.target.elements.validationCustomBio.value;
			// const imageUrl = event.target.elements.validationCustomImageUrl.value;
			// FETCH TO THE API TO TRY AND CREATE AN ACCOUNT

			fetch('https://agile-journey-79048.herokuapp.com/api/v1/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					user: {
						name,
						username,
						password,
						bio,
						avatar: "pretty optimistic to think I'll support avatars lol"
						// avatar: imageUrl
					}
				})
			})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					this.setState({wrongSignup: true})
				} else {
					localStorage.setItem("token", data.jwt);
					handleLogin(data.user)
					history.push('/discover')
				}
			})
			.catch(console.log)
		}
	}

	render () {

		return (
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
						<Form.Group as={Col} controlId="validationCustomUsername">
							<InputGroup>
								{/* <InputGroup.Prepend>
									<InputGroup.Text id="inputGroupPrepend">🌐</InputGroup.Text>
								</InputGroup.Prepend> */}
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
						<Form.Group as={Col} controlId="validationCustomBio">
							<InputGroup>
								<Form.Control
									type="text"
									placeholder="Short Bio"
									aria-describedby="inputGroupPrepend"
									required
								/>
								<Form.Control.Feedback type="invalid">
									Please put in a bio ffs.
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
					{/* <Form.Group>
						<Form.Check
							required
							label="Surrender my soul and morals"
							feedback="You must surrender your soul and morals."
						/>
					</Form.Group> */}
						<Form.Group >
							<Button type="submit">Sign up</Button>
						</Form.Group>

					{this.state.wrongSignup
					?
					<Alert variant="danger" onClose={() => this.setState({wrongSignup: false})} dismissible>
						<Alert.Heading>Oh snap! That username is already in use!</Alert.Heading>
					</Alert>
					: null}
				</Form>
			// </Col></Row>
		);
	}
}