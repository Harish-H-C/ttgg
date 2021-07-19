import React from 'react';
import Header7 from '../../component/Header7';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';



const NotBilledDisplay = (props) => {
    const [select_Start_Date,setSelectedDate] = React.useState(
        new Moment(new Date("2021-04-01")).format('YYYY-MM-DD')
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
    const renderNoBilled = ({userData}) => {
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
                        <tr key={dateis.ID} >
                            <td>{dateis.Id}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Service_Start}</td>
                            <td>{dateis.Service_End}</td>
                            <td>{dateis.Duration}</td>
                            <td>{dateis.Appointment_nr}</td>
                            <td>{dateis.Room}</td>
                            <td style={{'backgroundColor': dateis.Status === '0' ? 'aquamarine' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange': dateis.Status === '3' ? 'yellow' : 'white', 'width':'20px'}}>{dateis.Status}</td>
                            <td>{dateis.ther_id}</td>
                        </tr>
                    )
                })
            }
            else{
                return userData.map((dateis,index) => {
                    return(
                        <tr key={dateis.ID} >
                            <td>{dateis.Id}</td>
                            <td>{dateis.City}</td>
                            <td>{dateis.Outlet}</td>
                            <td>{dateis.Service_Start}</td>
                            <td>{dateis.Service_End}</td>
                            <td>{dateis.Duration}</td>
                            <td>{dateis.Appointment_nr}</td>
                            <td>{dateis.Room}</td>
                            <td style={{'backgroundColor': dateis.Status === '0' ? 'aquamarine' : dateis.Status === '1' ? '#F44336' : dateis.Status === '2' ? 'orange': dateis.Status === '3' ? 'yellow' : 'white', 'width':'20px'}}>{dateis.Status}</td>
                            <td>{dateis.ther_id}</td>
                        </tr>
                    )
                })
            }
        }
    }
    return(
            <div>
            <Header7/>
            <div className="locationSelector1 form-inline" >
                &nbsp;
                <select className="custom-select mb-3" style={{height:"50px",width:"250px"}}>
                <option>Bangalore</option>
                {/* <option>Bangalore</option>
                <option>Mysore</option>
                <option>Mangalore</option> */}
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <select className="custom-select mb-3" style={{height:"50px",width:"250px"}}>
                <option>Banashankari</option>
                {/* <option>Jayanagar</option>
                <option>Banashankari</option> */}
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="startDate">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container>
                            <KeyboardDatePicker
                                //disableToolbar
                                autoOk
                                style={{top:"-10px"}}
                                inputVariant="outlined"
                                variant="inline"
                                format='yyyy-MM-dd'
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
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="endDate">
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <Grid container>
                        <KeyboardDatePicker
                            //disableToolbar
                            autoOk
                            style={{top:"-10px"}}
                            inputVariant="outlined"
                            InputAdornmentProps={{ position: "end" }}
                            variant="inline"
                            format='yyyy-MM-dd'
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
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <button type="submit" className="btn1 btn-primary" onClick={userIsClicked} style={{marginTop:"-10px",marginLeft:"5px"}}>View Report</button>
            </div>
            <hr/>
            <h6>Appointment-Deletion Report</h6>
            {/* <label className="radioinline">
            <Link to="#"><input type="radio" name="optradio"/>&nbsp;BED</Link>
            </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <label className="radioinline">
            <Link to="#"><input type="radio" name="optradio"/>&nbsp;Chair</Link>
            </label>&nbsp;&nbsp;&nbsp;&nbsp;
            <label className="radioinline">
            <input type="radio" name="optradio"/>&nbsp;Both
            </label>
            <br/> */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered" id="customers1">
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th>City</th>
                            <th>Outlet</th>
                            <th>Service Start</th>
                            <th>Service End</th>
                            <th>Actual Duration</th>
                            <th>Appointment ID</th>
                            <th>Room</th>
                            <th>Status</th>
                            <th>Therapist Nr</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderNoBilled(props)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default NotBilledDisplay;

//<td style={{'backgroundColor': dateis.Deviation === '3' ?  'yellow' : 'black'}}>{dateis.Deviation}</td>