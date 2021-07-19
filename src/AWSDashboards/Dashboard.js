import React from 'react';
import {Link} from 'react-router-dom';
import Header1 from '../component/Header1';
import Footer from '../component/Footer';
import './Dashboard.css';

const Dashboard = () => {
    return(
        <div className="dashboardPage">
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
                    <Link to ="/detail/card" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu2">Therapist activity</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link to ="/extra1" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu2">Hotel billing</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/detail/touchdown" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu2">Service details</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/extra2" className="anchor_tags"><a className="nav-link" data-toggle="tab" href="#menu2">Hospital billing</a></Link>
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
                                    View here the details of Issues in services. Issues like difference in planned appointment duration and the actual service duration.
                                    <div className="pb-1">User can select outlets and date range to view issues</div>
                                    <div className="pt-2"></div>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square6"></div>
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
                                    Therapist activity
                                    </div>
                                    <div className="componentSubHeading">
                                    <p>View here the number of services done by each therapist.</p>
                                    <p>User can select outlets and date range for which the therapist effort needs to be seen</p>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square6"></div>
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
                                <img  src="../images/hotel.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    Hotel billing 
                                    </div>
                                    <div className="componentSubHeading">
                                    <p>View here the billing status of hotel units for the selected date range</p>
                                    <p>Discrepancies like unbilled units are highlighted. User can view the occupancy details as well</p>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square8"></div>
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
                    
                    <br/>
                    
                    

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
                                    <div className="pb-1">View here the complete details related to a service like actual service duration</div>
                                    <div className="pt-1">User can select outlets and date range for which the service details need to be viewed</div>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square6"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </div></Link>
                        </div>


                        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                            <Link to="/extra2"><div className="tileContainer">
                                <div className="tileComponent1">
                                    <img src="../images/hospital.jpg" alt=""/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                    Hospital billing 
                                    </div>
                                    <div className="componentSubHeading">
                                    <div className="pb-1">View here the billing status of hospital room units for the selected date range.</div>
                                    <div className="pt-2">Discrepancies like unbilled units are highlighted. User can view the occupancy details as well</div>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square7"></div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
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
                                    <div className="pb-1">View here information like downtime 
                                    individual units in the spa may be because of tampering or battery discharge.</div>
                                    <div className="pb-2"> Historic data can be viewed</div>
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="pl-5">
                                    <div className="square6"></div>
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
                    <br/>
                    <div className="form-inline">
                        <div className="square6"></div>
                        &nbsp;&nbsp;<div className="pb-1"  style={{fontSize:"85%"}}>Sallons & Spa</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="square7"></div>
                        &nbsp;&nbsp;<div style={{fontSize:"85%"}}>Hospitals</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="square8"></div>
                        &nbsp;&nbsp;<div style={{fontSize:"85%"}}>Hotels</div> &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>

                </div>
            </div>
            <div className="pb-5"/>
            <div className="pb-4"/>
            <Footer/>
        </div>
    )
}

export default Dashboard;


