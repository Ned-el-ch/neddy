import React, { Component } from 'react';

import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Alert from "react-bootstrap/Alert"
import InputGroup from "react-bootstrap/InputGroup"
import "../styles/login.css";

export default class LoginPage extends Component{

	state = {
		wrongLogin: false
	}
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
				if (data.user) {
					localStorage.setItem("token", data.jwt);
					handleLogin(data.user)
					history.push('/')
				} else {
					// console.log(data)
					this.setState({wrongLogin: true})
				}
			})
		}
	}

	render () {

		return (
			// <Row className="align-self-start justify-content-center">
				// <Col  xs={10} sm={8} md={8} lg={7} xl={8} className="col-xxl">
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
						<Form.Group >
							<Button type="submit">Log in</Button>
						</Form.Group>
					{this.state.wrongLogin
					?
					<Alert variant="danger" onClose={() => this.setState({wrongLogin: false})} dismissible>
						<Alert.Heading>Oh snap! Wrong deets!</Alert.Heading>
					</Alert>
					: null}
				</Form>
			//	{/* </Col> */}
			//{/* </Row> */}
		);

	}

}