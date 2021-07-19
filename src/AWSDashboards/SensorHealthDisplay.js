import React,{useState,useEffect} from 'react';
import Header4 from '../component/Header4';
import Footer from '../component/Footer';
import './style.css';
import '../index.css';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const SensorHealthDisplay = (props) => {
    const [select_Start_Date,setSelectedDate] = React.useState(
        new Moment(new Date("2021-04-01")).format('YYYY-MM-DD')
    )

    const [select_End_Date,setSelectedDate1] = React.useState(
        new Moment(new Date()).format('YYYY-MM-DD')
    )

    const [flagVal,setFlagVal] = useState(true)
    const [dataAvaility,setDataAvaility] = useState(true)
    const [userClicked,setUserClicked] = React.useState(false)
    const [holdStart,setHoldStart] = React.useState([])
    const [holdEnd,setHoldEnd] = React.useState([])

    const handleDateChange = (date) =>{
        function convert(str) {
            var date = new Date(str),
              mnth = ("0" + (date.getMonth() + 1)).slice(-2),
              day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
          }
        var date = convert(date)
        setSelectedDate(date)
    }

    const handleDateChange1 = (date) =>{
        function convert(str) {
            var date = new Date(str),
              mnth = ("0" + (date.getMonth() + 1)).slice(-2),
              day = ("0" + date.getDate()).slice(-2);
            return [date.getFullYear(), mnth, day].join("-");
          }
        var date = convert(date)
        setSelectedDate1(date)
        
    }
    const userIsClicked = () =>{
        setFlagVal(true)
        setUserClicked(true)
        setHoldStart(select_Start_Date)
        setHoldEnd(select_End_Date)
    }
    const dbDataCheck = () => {
        axios
          .get("http://192.168.0.101:5000/sensor_health")
          .then(res => {
            //   console.log(res)
            // var endDateis = new Date(select_End_Date);
            // var day = 60 * 60 * 24 * 1000;
            // var endDate = new Date(endDateis.getTime() + day);
            // function convert(str) {
            //     var date = new Date(str),
            //       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            //       day = ("0" + date.getDate()).slice(-2);
            //     return [date.getFullYear(), mnth, day].join("-");
            //   }
            // var endDate = convert(endDate)
            console.log(select_Start_Date)
            console.log(select_End_Date)
            const dataValuesRes = res.data.filter( dataValues => Moment(dataValues.Date).format('YYYY-MM-DD') >= select_Start_Date && Moment(dataValues.Date).format('YYYY-MM-DD') <= select_End_Date).map((dataValues,index) => {
              // console.log("enters here")
            //   console.log(dataValues.Service_Start)
              return dataValues
            })
            console.log("ur datavalue is")
            console.log(dataValuesRes)
            if(dataValuesRes.length == 0){
              setDataAvaility(false)
              console.log("empty")
            }
            else{
              setDataAvaility(true)
              console.log("not empty")
            }
          })
          .catch(err => {
            console.log(err);
          });
        //console.log(numOfMassDone, empNames);
      };
    const renderSensor = ({sensorData}) => {
        if(sensorData) {
            // var endDateis = new Date(holdEnd);
            // var day = 60 * 60 * 24 * 1000;
            // var endDate = new Date(endDateis.getTime() + day);
            // function convert(str) {
            //     var date = new Date(str),
            //       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            //       day = ("0" + date.getDate()).slice(-2);
            //     return [date.getFullYear(), mnth, day].join("-");
            //   }
            // var endDate = convert(endDate)
            if(userClicked){
                // console.log(holdStart)
                // console.log(endDate)
                return sensorData.filter(dateis => Moment(dateis.Date).format('YYYY-MM-DD') >= holdStart && Moment(dateis.Date).format('YYYY-MM-DD') <= holdEnd).map((dateis,index)  => {
                    return(
                        <tr key={dateis.ID}>
                            <td>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            {/* <td>{dateis.Date}</td> */}
                            <td>{Moment(dateis.Date).format('DD-MM-YY ')}</td>
                            <td>{dateis.Room}</td>
                            <td>{dateis.Status}</td>
                        </tr>
                    )
                })
            }
            else{
                // console.log("default")
                return sensorData.map((dateis,index) => {
                    return(
                        <tr key={dateis.ID}>
                            <td>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            {/* <td>{dateis.Date}</td> */}
                            <td>{Moment(dateis.Date).format('DD-MM-YY ')}</td>
                            <td>{dateis.Room}</td>
                            <td>{dateis.Status}</td>
                        </tr>
                    )
                })
            }
        }
    }
    useEffect(() => {
        // console.log("finally entered")
        if(flagVal){
            dbDataCheck();
            setFlagVal(false)
        }
    }, [dbDataCheck]);
    return(
        <div className="sensorHealth">
            <Header4/>
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
                                                    height: 44
                                                }
                                            }}
                                            autoOk
                                            style={{ top: "-10px", width: "200px" }}
                                            inputVariant="outlined"
                                            variant="inline"
                                            format='dd-MM-yy'
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
                                            format='dd-MM-yy'
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
            <hr style={{marginTop:"-1px"}}/>
            
            {
                dataAvaility?
                <div className="container-fluid">
                    
                    
                    <div className="row">
                        <div className="col-sm-7">
                        <div style={{ border: "1px solid #80c8ff",paddingRight:"10px" }}>
                        <h5 style={{ marginTop: "5px", marginLeft: "8px", fontSize: "15px"}}>System Log</h5>
                        
                            <div className="tableFixHead">
                                <table className="table table-striped table-bordered" id="customers1">
                                    <thead>
                                        <tr>
                                            <th style={{ 'width': '50px' }}>&nbsp;#</th>
                                            <th style={{ 'width': '100px' }}>City</th>
                                            <th style={{ 'width': '120px' }}>Outlet</th>
                                            <th style={{ 'width': '100px' }}>Date</th>
                                            <th style={{ 'width': '90px' }}>Room</th>
                                            <th style={{ 'width': '90px' }}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderSensor(props)}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            <div className="pb-5"/>
                            <div className="pb-4"/>
                        </div>
                        
                    </div>    
                   
                </div>
                :
                <div className="container">
                    <div className="jumbotron" style={{marginLeft:"20%",marginRight:"20%",marginTop:"9%"}}>
                    <p style={{fontSize:"25px",fontWeight:"bold"}}>No data found for the selected date range</p>
                    </div>
                </div>
            }
            {/* <br/> */}
            {/* <div className="pb-3"/> */}
            <Footer/>
        </div>
                
    )
}

export default SensorHealthDisplay;