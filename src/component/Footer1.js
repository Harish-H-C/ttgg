import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import './Footer1.css'


const Footer1 = () => {
    return(
        <div className="footer1">
            <div className="container-fluid"> 
                <ReactBootstrap.Navbar collapseOnSelect expand="sm" bg="" variant="dark"  >
                    <ReactBootstrap.Navbar.Brand>
                        <div className="text" fixed="bottom">
                        <h6>Copyright@TTBS 2021</h6>
                        </div>
                    </ReactBootstrap.Navbar.Brand>
                </ReactBootstrap.Navbar>
            </div>
        </div>
    )
}

export default Footer1;