import logo from "../../logo.svg";
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.css';

const NavigationBar = () => {
	return (
		<>
			<Navbar fixed="top" bg="dark" variant="dark" expand="md" >
				<Navbar.Brand href="/" ><img
					alt=""
					src={logo}
					width="30"
					height="30"
					className="d-inline-block align-top"
				/>{' '}TobiStudio</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarSupportedContent" />
				<Navbar.Collapse id="navbarSupportedContent">
					<Nav className="mr-auto">
						<Nav.Link href="/">Home</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};

export default NavigationBar;
