import React, { Component } from 'react';

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import InputGroup from "react-bootstrap/InputGroup"
import "../styles/login.css";

export default class LoginPage extends Component{

	handleSubmit = (event) => {
		event.preventDefault();
		// debugger;
		const handleLogin = this.props.handleLogin;
		const history = this.props.history;
		const form = event.currentTarget;
		
		if (!form.checkValidity() === false) {
			
			event.stopPropagation();
			const username = event.target.elements.validationCustomUsername.value;
			const password = event.target.elements.validationCustomPassword.value;
			// FETCH TO THE API TO TRY TO LOGIN

			fetch("https://agile-journey-79048.herokuapp.com/api/v1/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					user : {
						username: username,
						password: password
					}
				})
			})
				.then(res => res.json())
				.then(data => {
					localStorage.setItem("token", data.jwt);
					return data.user;
				})
				.then(handleLogin)
				.then(history.push('/'))
				.catch(console.log)
				
				// .then(console.log)

		}

	}

	render () {

		return (
			<Row className="align-self-start justify-content-center">
			<Col  xs={10} sm={8} md={8} lg={7} xl={8} className="col-xxl">
				<Form onSubmit={this.handleSubmit} >
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
									Please input a username.
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
					<Form.Row>
						<Form.Group >
							<Button type="submit">oof owie loggy loggy</Button>
						</Form.Group>
					</Form.Row>
				</Form>
			</Col>
			</Row>
		);

	}

}