import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Signin from './Signin';
import Register from './Register';
import Dashboard from '../AWSDashboards/Dashboard';
import TouchDownReport from '../AWSDashboards/TouchDownReport';
import SensorHealth from '../AWSDashboards/SensorHealth';
import MisMatchReport from '../AWSDashboards/MisMatchTable';
import AppointmentChart from '../AWSDashboards/Charts/AppMismatch';
import DurationChart from '../AWSDashboards/Charts/DurationMismatch';
import NotBilledChart from '../AWSDashboards/Charts/NotBilled';
import Therapist from '../AWSDashboards/TherapistActivity';
import Thid1 from '../AWSDashboards/Thid1';
import Extra1 from '../AWSDashboards/Extra1';
import Extra2 from '../AWSDashboards/Extra2';


const Routing = () => {
    return(
        <BrowserRouter>
            <Route exact path = "/" component={Signin}></Route>
            <Route path = "/register" component={Register}></Route>
            <Route path = "/dashboard" component={Dashboard}></Route>
            <Route path = "/detail/touchdown" component={TouchDownReport}></Route>
            <Route path = "/detail/sensor" component={SensorHealth}></Route>
            <Route path = "/detail/mismatch" component={MisMatchReport}></Route>
            <Route path = "/detail/card" component={Therapist}></Route>
            <Route path = "/detail/thid" component={Thid1}></Route>
            <Route path = "/appntmismatch" component={AppointmentChart}></Route>
            <Route path = "/durmismatch" component={DurationChart}></Route>
            <Route path = "/notbilled" component={NotBilledChart}></Route>
            <Route path = "/extra1" component={Extra1}></Route>
            <Route path = "/extra2" component={Extra2}></Route>
        </BrowserRouter>
    )
}

export default Routing;