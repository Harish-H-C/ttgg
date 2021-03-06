import React from 'react';
import {Link} from 'react-router-dom';
import Header1 from '../component/Header1';
import Footer from '../component/Footer';
import './Dashboard.css';

const Dashboard = () => {
    return(
        <div>
            <Header1/>
            <div className="container-fluid">
            <div className="col-md-12 col-lg-12">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                    <Link to="#" className="anchor_tags"><a className="nav-link active" data-toggle="tab" >Dashboard</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/detail/mismatch" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu1">Service related issues</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link to ="/detail/card" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu2">Therapist schedule</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/detail/touchdown" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu2">Service details</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/detail/sensor" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu2">System Log</a></Link>
                    </li>
                </ul>
            </div>

                <br/>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <Link to="/detail/mismatch"><div className="tileContainer">

                                <div className="tileComponent1">
                                    <img src="../images/pie-chart123.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    Service related issues
                                    </div>
                                    <div className="componentSubHeading">
                                    View here the details of Issues in services. The following issues are highlighted : 
                                    <div className="pb-1">User can select outlets and date range for which the therapist effort needs to be seen</div>
                                    <div className="pt-2"></div>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square1"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="pb-5"></div>
                                    {/* <div className="pb-1">- Deletion of appointments after service is completed</div>
                                    <p>User can select outlets and date range to view issues</p> */}
                                    </div>
                                </div>
                            </div></Link>
                        </div>

                        
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <Link to="/detail/card"><div className="tileContainer">
                                <div className="tileComponent1">
                                <img  src="../images/staff-loading-2.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    Therapist schedule
                                    </div>
                                    <div className="componentSubHeading">
                                    <p>View here the number of services done by each therapist.</p>
                                    <p>User can select outlets and date range for which the therapist effort needs to be seen</p>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square1"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="pb-5"></div>
                                    </div>
                                </div>
                            </div></Link>
                        </div>

                        
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <Link to="/extra1"><div className="tileContainer">
                                <div className="tileComponent1">
                                <img  src="../images/staff-loading-2.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    Hotel Billing 
                                    </div>
                                    <div className="componentSubHeading">
                                    <p>View here the number of services done by each therapist.</p>
                                    <p>User can select outlets and date range for which the therapist effort needs to be seen</p>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="pb-5"></div>
                                    </div>
                                </div>
                            </div></Link>
                        </div>
                    </div>

                    
                    

                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <Link to="/detail/touchdown"><div className="tileContainer">
                                <div className="tileComponent1">
                                <img src="../images/service-details1.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    Service details
                                    </div>
                                    <div className="componentSubHeading">
                                    <p>View here the complete details related to a service like actual service duration, therapist number, type of service etc</p>
                                    <p>Historic data can be viewed</p>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square1"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="pb-5"></div>
                                    </div>
                                </div>
                            </div></Link>
                        </div>


                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <Link to="/extra2"><div className="tileContainer">
                                <div className="tileComponent1">
                                    <img src="../images/system-log1.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    Hospital Billing 
                                    </div>
                                    <div className="componentSubHeading">
                                    <p>View here information like downtime of individual units in the spa may be because of tampering or battery discharge.</p>
                                    <p> Historic data can be viewed</p>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square2"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="pb-5"></div>
                                    </div>
                                </div>
                            </div></Link>
                        </div>

                        {/* <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12"></div> */}
                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <Link to="/detail/sensor"><div className="tileContainer">
                                <div className="tileComponent1">
                                    <img src="../images/system-log1.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    System log
                                    </div>
                                    <div className="componentSubHeading">
                                    <p>View here information like downtime of individual units in the spa may be because of tampering or battery discharge.</p>
                                    <p> Historic data can be viewed</p>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square1"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className="pb-5"></div>
                                    </div>
                                </div>
                            </div></Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}

export default Dashboard;


