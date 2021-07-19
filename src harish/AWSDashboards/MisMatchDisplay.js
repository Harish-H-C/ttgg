import React, { useState, useEffect } from 'react';
import Header2 from '../component/Header2';
import Footer from '../component/Footer';
import DoughnutChart from './DoughnutChart';import './MisMatchDisplay.css';
import axios from "axios";
import '../index.css';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';

const MisMatchDisplay = (props) => {
    const [holdStartState, setHoldStartState] = React.useState(
        new Moment().subtract(3, 'd').format('YYYY-MM-DD')
    )
    const [holdEndState, setHoldEndState] = React.useState(
        new Moment().add(1, 'd').format('YYYY-MM-DD')
    )

    const [select_Start_Date, setSelectedDate] = React.useState(
        // new Moment(new Date("2021-04-01")).format('YYYY-MM-DD')
        new Moment().subtract(3, 'd').format('YYYY-MM-DD')
    )
    const [select_End_Date, setSelectedDate1] = React.useState(
        new Moment(new Date()).format('YYYY-MM-DD')
    )

    const [flagVal, setFlagVal] = useState(true)
    const [dataAvaility, setDataAvaility] = useState(true)
    const [userClicked, setUserClicked] = React.useState(false)
    const [holdStart, setHoldStart] = React.useState([])
    const [holdEnd, setHoldEnd] = React.useState([])

    const handleDateChange = (date) => {
        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
        }
        var date = convert(date)
        setSelectedDate(date)
    }

    const handleDateChange1 = (date) => {
        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
        }
        var date = convert(date)
        setSelectedDate1(date)

    }
    const userIsClicked = () => {
        setFlagVal(true)
        setUserClicked(true)
        setHoldStart(select_Start_Date)
        setHoldEnd(select_End_Date)

    }
    const dbDataCheck = () => {
        axios
            .get("http://localhost:8900/details")
            .then(res => {
                console.log(res)
                var endDateis = new Date(select_End_Date);
                var day = 60 * 60 * 24 * 1000;
                var endDate = new Date(endDateis.getTime() + day);
                function convert(str) {
                    var date = new Date(str),
                        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                        day = ("0" + date.getDate()).slice(-2);
                    return [date.getFullYear(), mnth, day].join("-");
                }
                var endDate = convert(endDate)
                console.log(select_Start_Date)
                console.log(select_End_Date)
                const dataValuesRes = res.data.filter(dataValues => dataValues.Service_Start >= select_Start_Date && dataValues.Service_Start <= endDate).map((dataValues, index) => {
                    // console.log("enters here")
                    //   console.log(dataValues.Service_Start)
                    return dataValues
                })
                console.log("ur datavalue is")
                console.log(dataValuesRes)
                if (dataValuesRes.length == 0) {
                    setDataAvaility(false)
                    console.log("empty")
                }
                else {
                    setDataAvaility(true)
                    console.log("not empty")
                }
            })
            .catch(err => {
                console.log(err);
            });
        //console.log(numOfMassDone, empNames);
    };

    const renderUser = ({ userData }) => {
        if (userData) {
            var endDateis = new Date(holdEnd);
            var day = 60 * 60 * 24 * 1000;
            var endDate = new Date(endDateis.getTime() + day);
            function convert(str) {
                var date = new Date(str),
                    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                    day = ("0" + date.getDate()).slice(-2);
                return [date.getFullYear(), mnth, day].join("-");
            }
            var endDate = convert(endDate)
            if (userClicked) {
                return userData.filter(dateis => dateis.Service_Start >= holdStart && dateis.Service_Start <= endDate).map((dateis, index) => {
                    return (
                        <tr key={dateis.Id}>
                            <td>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Service_Start}</td>
                            {/* <td>{dateis.Service_End}</td> */}
                            <td>{dateis.Duration}</td>
                            <td>{dateis.Appointmentnr}</td>
                            <td>{dateis.Room}</td>
                            {/* <td style={{ 'backgroundColor': dateis.Status === '0' ? 'aquamarine' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange' : dateis.Status === '3' ? 'yellow' : 'white', 'width': '20px' }}>{dateis.Status}</td> */}
                            <td><button style={{ height:"20px",width:"100%",borderRadius:"5px",'backgroundColor': dateis.Status === '0' ? 'aquamarine' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange' : dateis.Status === '3' ? 'yellow' : 'white' }}>{dateis.Status}</button></td>
                            <td>{dateis.ther_id}</td>

                        </tr>
                    )
                })
            }
            else {
                return userData.filter(dateis => dateis.Service_Start >= holdStartState && dateis.Service_Start <= holdEndState).map((dateis, index) => {
                    return (
                        <tr key={dateis.ID}>
                            <td>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Service_Start}</td>
                            {/* <td>{dateis.Service_End}</td> */}
                            <td>{dateis.Duration}</td>
                            <td>{dateis.Appointmentnr}</td>
                            <td>{dateis.Room}</td>
                            {/* <td style={{ 'backgroundColor': dateis.Status === '0' ? 'aquamarine' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange' : dateis.Status === '3' ? 'yellow' : 'white', 'width': '20px' }}>{dateis.Status}</td> */}
                            <td><button style={{ height:"20px",width:"100%",borderRadius:"5px",'backgroundColor': dateis.Status === '0' ? 'aquamarine' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange' : dateis.Status === '3' ? 'yellow' : 'white' }}>{dateis.Status}</button></td>
                            <td>{dateis.ther_id}</td>
                        </tr>
                    )
                })
            }
        }
    }
    useEffect(() => {
        // console.log("finally entered")
        if (flagVal) {
            dbDataCheck();
            setFlagVal(false)
        }
    }, [dbDataCheck]);
    return (
        <div className="misMatch">
            <Header2 />
            <div>
                <div className="locationSelector" >
                    <div className="col-lg-12 col-md-12 ">
                        <div className="form-inline">
                            <select className="custom-select mb-2" style={{ height: "42px", width: "200px" }}>
                                <option>Bangalore</option>
                                {/* <option selected>Bangalore</option>
                    <option disabled>Mysore</option>
                    <option disabled>Mangalore</option> */}
                            </select>
                            <div className="pl-5"></div>

                            <select className="custom-select mb-2" style={{ height: "42px", width: "200px" }}>
                                <option>Banashankari</option>
                                {/* <option selected>Banashankari</option>
                    <option disabled>Jayanagar</option>  */}
                            </select>
                            <div className="pl-5"></div>

                            <div className="startDate">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container>
                                        <KeyboardDatePicker
                                            //disableToolbar
                                            InputProps={{
                                                style: {
                                                    fontSize: 14,
                                                    height: 44,
                                                }
                                            }}
                                            autoOk
                                            style={{ top: "-10px", width: "200px" }}
                                            inputVariant="outlined"
                                            variant="inline"
                                            format='yyyy-MM-dd'
                                            InputAdornmentProps={{ position: "end" }}
                                            margin='normal'
                                            id='date-picker'
                                            label='Select Start Date'
                                            value={select_Start_Date}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date'
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="pl-5"></div>
                            <div className="endDate">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <Grid container>
                                        <KeyboardDatePicker
                                            //disableToolbar
                                            InputProps={{
                                                style: {
                                                    fontSize: 14,
                                                    height: 44
                                                }
                                            }}
                                            autoOk
                                            style={{ top: "-10px", width: "200px" }}
                                            inputVariant="outlined"
                                            InputAdornmentProps={{ position: "end" }}
                                            variant="inline"
                                            format='yyyy-MM-dd'
                                            margin='normal'
                                            id='date-picker'
                                            label='Select End Date'
                                            value={select_End_Date}
                                            onChange={handleDateChange1}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date'
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="pl-5"></div>
                            <button type="submit" className="btn1" onClick={userIsClicked}>View Report</button>
                        </div>

                    </div>
                </div>
                {/* <div className="pb-2"></div> */}
            </div>

            {
                dataAvaility ?
                    <div className="container-fluid">
                        <div style={{ border: "1px solid #99d3ff" }} >
                            <div className="row">
                                <div className="col-lg-9 col-md-6">
                                    <div style={{ border: "1px solid #80c8ff", paddingRight: "7px" }} >
                                        <h5 style={{ marginTop: "5px", marginLeft: "8px", fontSize: "15px" }}>Service Related Issues</h5>
                                        <div className="tableFixHead">
                                            <table className="table table-striped" id="customers">
                                                <thead>
                                                    <tr>
                                                        <th>Nr&nbsp;</th>
                                                        <th>City</th>
                                                        <th>Outlet</th>
                                                        <th>Service Start</th>
                                                        {/* <th>Service End</th> */}
                                                        <th>Actual Duration</th>
                                                        <th>Appointment ID</th>
                                                        <th>Room</th>
                                                        <th>&nbsp;Status&nbsp;</th>
                                                        <th>Therapist Nr</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {renderUser(props)}
                                                </tbody>
                                            </table>
                                        </div>
                                        {/* <br /> */}
                                    </div>
                                </div>


                                <div className="col-lg-3 col-md-6 ">
                                    <div className="pt-4">
                                        <span className="rounded-sm">
                                            <div className="chart">
                                                {
                                                    userClicked ?
                                                        <DoughnutChart start={holdStart} end={holdEnd} />
                                                        :
                                                        <DoughnutChart start={holdStartState} end={holdEndState} />
                                                }
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-2"/>
                        <div className="form-inline" >
                            <div className="square2"></div>
                            <p>1-Internet not available</p> &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="square3"></div>
                            <p>2-Appointment Duration != Actual Duration</p> &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="square4"></div>
                            <p>3-Appointment Deleted after Service</p>
                        </div>
                        <div className="pb-4"/>
                    </div>
                    :
                    <div>
                        <hr style={{marginTop:"-1px"}}/>
                        <div className="pb-3"></div>

                        <div className="container" style={{ marginTop: "-8px" }}>
                            <div className="jumbotron" style={{ marginLeft: "20%", marginRight: "20%", marginBottom: "4%", marginTop: "5%" }}>
                                <p style={{ fontSize: "25px", fontWeight: "bold" }}>No data found for the selected date range</p>
                            </div>
                        </div>
                        <div className="pb-5"></div>
                        {/* <div className="pb-5"></div>
                        <div className="pb-5"/>
                        <div className="pb-5"/> */}
                    </div>

            }
            <p className="pb-2"></p>
            <Footer />
        </div>

    )

}



export default MisMatchDisplay;

//<td style={{'backgroundColor': dateis.Deviation === '1' ? 'red' : dateis.Deviation === '2' ? 'orange': dateis.Deviation === '3' ? 'yellow' : 'black'}}>{dateis.Deviation}</td>