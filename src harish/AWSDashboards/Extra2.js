import React,{useState,useEffect} from 'react';
import './style.css';
import '../index.css';
import Footer from '../component/Footer';
import Header10 from '../component/Header10';
import axios from "axios";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const Extra2 = (props) => {
    const [holdStartState,setHoldStartState] = React.useState(
        new Moment().subtract(3,'d').format('YYYY-MM-DD')
    )
    const [holdEndState,setHoldEndState] = React.useState(
        new Moment().add(1,'d').format('YYYY-MM-DD')
    )

    const [select_Start_Date,setSelectedDate] = React.useState(
        // new Moment(new Date("2021-04-01")).format('YYYY-MM-DD')
        new Moment().subtract(3,'d').format('YYYY-MM-DD')
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
          .get("http://localhost:8900/api")
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
            const dataValuesRes = res.data.filter( dataValues => dataValues.Service_Start >= select_Start_Date && dataValues.Service_Start <= endDate).map((dataValues,index) => {
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
    
    const renderUser = ({userData}) => {
        if(userData){
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
                return userData.filter(dateis =>dateis.Service_Start >= holdStart && dateis.Service_Start <= endDate).map((dateis,index) => {
                    return(
                        <tr key={dateis.ID}>
                            <td>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Service_Start}</td>
                            <td>{dateis.Service_End}</td>
                            <td>{dateis.Duration}</td>
                            <td>{dateis.Appointmentnr}</td>
                            <td>{dateis.Room}</td>
                            <td style={{'backgroundColor': dateis.Status === '0' ? '#64DD17' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange': dateis.Status === '3' ? 'yellow' : 'white', 'width':'20px'}}>{dateis.Status}</td>
                            <td>{dateis.ther_id}</td>
                            <td>{dateis.wifi_status}</td>
                        </tr>
                    )
                })
            }
            else{
                return userData.filter(dateis =>dateis.Service_Start >= holdStartState && dateis.Service_Start <= holdEndState).map((dateis,index) => {
                    return(
                        <tr key={dateis.ID}>
                            <td>{dateis.ID}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Service_Start}</td>
                            <td>{dateis.Service_End}</td>
                            <td>{dateis.Duration}</td>
                            <td>{dateis.Appointmentnr}</td>
                            <td>{dateis.Room}</td>
                            <td style={{'backgroundColor': dateis.Status === '0' ? 'aquamarine' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange': dateis.Status === '3' ? 'yellow' : 'white', 'width':'20px'}}>{dateis.Status}</td>
                            <td>{dateis.ther_id}</td>
                            <td>{dateis.wifi_status}</td>
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
        <div className="extra2">
            <Header10/>
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
            <hr/>
            {
                dataAvaility?
                <div>
                {/* <h5>&nbsp;Hospital Billing</h5> */}
                <div className="row">
                    <div className="col-lg-11">
                        <div className="tableFixHead1">
                            <table className="table table-bordered" id="customers2" >
                                <thead>
                                    <tr>
                                        <th>City</th>
                                        <th>Outlet</th>
                                        <th>Room Nr</th>
                                        <th>01-06-2021</th>
                                        <th>02-06-2021</th>
                                        <th>03-06-2021</th>
                                        <th>04-06-2021</th>
                                        <th>05-06-2021</th>
                                        <th>06-06-2021</th>
                                        
                                        {/* 
                                        <th>07-06-2021</th>
                                        <th>08-06-2021</th>
                                        <th>09-06-2021</th>
                                        <th>10-06-2021</th> 
                                        <th>11-06-2021</th>
                                        <th>12-06-2021</th>
                                        <th>13-06-2021</th>
                                        <th>14-06-2021</th>
                                        <th>15-06-2021</th>
                                        <th>16-06-2021</th>
                                        <th>17-06-2021</th>
                                        <th>18-06-2021</th>
                                        <th>19-06-2021</th>
                                        <th>20-06-2021</th>
                                        <th>21-06-2021</th>
                                        <th>22-06-2021</th>
                                        <th>23-06-2021</th>
                                        <th>24-06-2021</th>
                                        <th>25-06-2021</th>
                                        <th>26-06-2021</th>
                                        <th>27-06-2021</th>
                                        <th>28-06-2021</th>
                                        <th>29-06-2021</th>
                                        <th>30-06-2021</th>
                                        <th>31-06-2021</th> */} 
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Room 1</td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Room 2</td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Room 3</td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Room 4</td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Room 4A</td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                    </tr>
                                    <tr>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                        <td style={{backgroundColor:'#B0BEC5'}}>Room 4B</td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                    </tr>
                                    {/* <tr>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'#B0BEC5',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Bangalore</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'#B0BEC5',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Banashankari</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'#B0BEC5',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Room 6</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                        <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>       
                </div>  
                </div>
                    :

                    <div>
                        {/* <h5>&nbsp;Hospital Billing</h5> */}
                        <div className="row">
                            <div className="col-lg-11">
                                <div className="tableFixHead1">
                                    <table className="table table-bordered" id="customers2" >
                                        <thead>
                                            <tr>
                                                <th>City</th>
                                                <th>Outlet</th>
                                                <th>Room Nr</th>
                                                <th>01-06-2021</th>
                                                <th>02-06-2021</th>
                                                <th>03-06-2021</th>
                                                <th>04-06-2021</th>
                                                <th>05-06-2021</th>
                                                <th>06-06-2021</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Room 1</td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                            </tr>
                                            <tr>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Room 2</td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                            </tr>
                                            <tr>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Room 3</td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                            </tr>
                                            <tr>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Room 4</td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                            </tr>
                                            <tr>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Room 4A</td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                            </tr>
                                            <tr>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Bangalore</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Banashankari</td>
                                                <td style={{backgroundColor:'#B0BEC5'}}>Room 4B</td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                            </tr>
                                            {/* <tr>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'#B0BEC5',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Bangalore</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'#B0BEC5',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Banashankari</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'#B0BEC5',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Room 6</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'White',color:'Black',marginTop:"-6px",marginBottom:"-5px"}}>No Occupancy</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Orange',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>In Progress</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Green',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Billed</button></td>
                                                <td ><button style={{height:"40px",width:"100%",borderRadius:"5px",backgroundColor:'Red',color:'white',marginTop:"-6px",marginBottom:"-5px"}}>Unbilled</button></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>    
                            </div>
                        </div>    
                    </div>
                
            }
            <div className="pb-5"></div>
            <div className="pb-2"></div>
            <Footer/>
            
        </div>
    )
}

export default Extra2;