import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Header.css'

const Header7 = () => {
    return(
        <div className="header1">
            <ReactBootstrap.Navbar collapseOnSelect expand="sm" bg="" variant="dark" >

                <Link to="/detail/mismatch">
                    <ReactBootstrap.Navbar.Brand>
                {/* <img className="d-inline-block align-top"
                    alt=""
                    src="../images/o2spa4.jpg"
                    width="30"
                    height="30"
                    
                />{' '} */}
                        SPA Dashboard 
                    </ReactBootstrap.Navbar.Brand>
                </Link><p className="extratag">-> Appointment Deletion Report</p>

                <ReactBootstrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <ReactBootstrap.Navbar.Collapse id="responsive-navbar-nav">
                    <ReactBootstrap.Nav className="mr-auto">
                        
                    </ReactBootstrap.Nav>

                    <ReactBootstrap.Nav>
                    <Link to="/">
                        <ReactBootstrap.Nav.Link eventKey={2} href="#memes">
                            Sign out
                        </ReactBootstrap.Nav.Link>
                    </Link>
                    </ReactBootstrap.Nav>
                </ReactBootstrap.Navbar.Collapse>

            </ReactBootstrap.Navbar>
        </div>
        
    )
}

export default Header7;