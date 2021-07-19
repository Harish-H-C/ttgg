import React from  'react';
import Header8 from '../component/Header8';
import Footer from '../component/Footer';
import './style.css';
import Barchart from '../AWSDashboards/BarChart';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const Therapist = () => {
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
        setUserClicked(true)
        setHoldStart(select_Start_Date)
        setHoldEnd(select_End_Date)
    }

    return(
        <div className="therActivity">
            <Header8/>
            <div className="locationSelector1" >
                <div className="col-lg-12 col-md-12 ">
                    <div className="form-inline" style={{marginTop:"-5px"}}>
                        <select className="custom-select mb-3" style={{height:"42px",width:"200px"}}>
                            <option>Bangalore</option>
                            {/* <option disabled>Mysore</option>
                            <option disabled>Mangalore</option> */}
                        </select>
                        <div className="pl-5"></div>                
                        <select className="custom-select mb-3" style={{height:"42px",width:"200px"}}>
                            <option>Banashankari</option>
                            {/* <option disabled>Jayanagar</option> */}
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
                                        style={{top:"-10px",width:"200px"}}
                                        inputVariant="outlined"
                                        variant="inline"
                                        format='dd-MM-yy'
                                        InputAdornmentProps={{ position: "end" }}
                                        margin='normal'
                                        id='date-picker'
                                        label='Select Start Date'
                                        value={select_Start_Date}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps = {{
                                        'aria-label':'change date'
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
                                    style={{top:"-10px",width:"200px"}}
                                    inputVariant="outlined"
                                    InputAdornmentProps={{ position: "end" }}
                                    variant="inline"
                                    format='dd-MM-yy'
                                    margin='normal'
                                    id='date-picker'
                                    label='Select End Date'
                                    value={select_End_Date}
                                    onChange={handleDateChange1}
                                    KeyboardButtonProps = {{
                                    'aria-label':'change date'
                                    }}
                                />
                                </Grid>
                            </MuiPickersUtilsProvider> 
                        </div>
                        <div className="pl-5"></div>
                        <button type="submit" className="btn1" onClick={userIsClicked} >View Report</button>
                    </div>
                </div>
            </div>
            <hr style={{marginTop:"-1px"}}/>
            <div className="pb-3"></div>
            
            <div className="col-lg-8 col-md-12 col-sm-12">
                {
                    userClicked?
                    <Barchart start={holdStart} end={holdEnd}/>
                    :
                    <Barchart start={holdStartState} end={holdEndState}/>
                } 
            </div>
            <div className="pb-5"/>
            <div className="pb-3"/>
            <Footer/>
        </div>
    )
}
export default Therapist;