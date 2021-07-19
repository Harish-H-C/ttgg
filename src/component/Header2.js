import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Header.css'


const Header2 = () => {
    return(
        <div className="header1">
            <ReactBootstrap.Navbar collapseOnSelect expand="sm" bg="" variant="dark" >

                <Link to="/dashboard">
                    <ReactBootstrap.Navbar.Brand>
                        <h5 className="color">Management Dashboard </h5>
                    </ReactBootstrap.Navbar.Brand>
                </Link>
                <p className="extratag"><h5 className="sriHtag">-> Service Related Issues</h5></p>

                <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootstrap.Nav className="mr-auto">
                        
                    </ReactBootstrap.Nav>

                    <ReactBootstrap.Nav>
                    <Link to="/">
                        <ReactBootstrap.Nav.Link eventKey={2} href="#memes">
                            
                            <h6 className="pb-3"> Sign out</h6>
                        </ReactBootstrap.Nav.Link>
                    </Link>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>

            </ReactBootstrap.Navbar>
        </div>
        
    )
}

export default Header2;