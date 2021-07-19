import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Header.css'

const Header1 = () => {
    return(
        <div className="header1">
            <ReactBootstrap.Navbar collapseOnSelect expand="sm" bg="" variant="dark" >

                <ReactBootstrap.Navbar.Brand>
                    <div className="p-2">
                        <h4>Management Dashboard</h4>
                    </div>
                </ReactBootstrap.Navbar.Brand>

                <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootstrap.Nav className="mr-auto">
                        
                    </ReactBootstrap.Nav>

                    <ReactBootstrap.Nav>
                    <Link to="/">
                        <ReactBootstrap.Nav.Link eventKey={2} href="#memes">
                            <h6>Sign out</h6>
                        </ReactBootstrap.Nav.Link>
                    </Link>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>

            </ReactBootstrap.Navbar>
        </div>
        
    )
}

export default Header1;