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
          .get("http://localhost:8900/sensor_health")
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
            const dataValuesRes = res.data.filter( dataValues => dataValues.Date >= select_Start_Date && dataValues.Date <= endDate).map((dataValues,index) => {
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
            if(userClicked){
                // console.log(holdStart)
                // console.log(endDate)
                return sensorData.filter(dateis =>dateis.Date >= holdStart && dateis.Date <= endDate).map((dateis,index)  => {
                    return(
                        <tr key={dateis.ID}>
                            <td style={{'width':'40px'}}>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Date}</td>
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
                            <td style={{'width':'40px'}}>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Date}</td>
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
        <div>
            <Header4/>
            <div>
                <div className="locationSelector" >
                    <div className="col-lg-12 col-md-12 ">
                        <div className="form-inline">
                            <select className="custom-select mb-2" style={{ height: "50px", width: "200px" }}>
                                <option>Bangalore</option>
                                {/* <option selected>Bangalore</option>
                    <option disabled>Mysore</option>
                    <option disabled>Mangalore</option> */}
                            </select>
                            <div className="pl-5"></div>

                            <select className="custom-select mb-2" style={{ height: "50px", width: "200px" }}>
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
            <hr style={{marginTop:"-1px"}}/>
            
            {
                dataAvaility?
                <div>
                    <h5>System Log</h5>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="tableFixHead">
                                <table className="table table-striped table-bordered" id="customers1">
                                    <thead>
                                        <tr>
                                            <th>Nr</th>
                                            <th>City</th>
                                            <th>Outlet</th>
                                            <th>Date</th>
                                            <th>Room</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderSensor(props)}
                                    </tbody>
                                </table>
                            </div>
                            <div className="pb-4"/>
                        </div>
                    </div>    
                </div>
                :
                <div className="container">
                <div className="jumbotron" style={{marginLeft:"20%",marginRight:"20%",marginBottom:"18%",marginTop:"5%"}}>
                <p style={{fontSize:"25px",fontWeight:"bold"}}>No data found for the selected date range</p>
                </div>
                </div>
            }
            <br/>
            <Footer/>
        </div>
                
    )
}

export default SensorHealthDisplay;