import React from 'react';
// import {Link} from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap';
import './Header.css'


const Header = () => {
    return(
        <div className="header">
            <div className="container-fluid">
                <ReactBootstrap.Navbar collapseOnSelect expand="sm" bg="" variant="dark" >

                <ReactBootstrap.Navbar.Brand>
                <div className="p-2" >
                   <h4>Sign In</h4>
                </div>
                </ReactBootstrap.Navbar.Brand>

                <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootstrap.Nav className="mr-auto">
                        {/* <ReactBootstrap.Nav.Link><Link to="/">Home</Link></ReactBootstrap.Nav.Link> */}
                    </ReactBootstrap.Nav>

                    {/* <ReactBootstrap.Nav>
                        <ReactBootstrap.NavDropdown title="My Account" id="collasible-nav-dropdown">
                            <ReactBootstrap.NavDropdown.Item href="#action/3.1">Dashboard Details</ReactBootstrap.NavDropdown.Item> 
                            <ReactBootstrap.NavDropdown.Item href="#action/3.2">Touchdown Report</ReactBootstrap.NavDropdown.Item> 
                        </ReactBootstrap.NavDropdown>
                    </ReactBootstrap.Nav> */}
                    {/* <ReactBootstrap.Form inline >
                        <ReactBootstrap.Button className="Button" variant="outline-warning"><Link to="/register">Register</Link></ReactBootstrap.Button>
                    </ReactBootstrap.Form> */}
                </ReactBootstrap.Navbar.Collapse>

                </ReactBootstrap.Navbar>
            </div>
        </div>
    )
}

export default Header;