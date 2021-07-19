import React, { Component } from 'react';
import SensorHealthDisplay from './SensorHealthDisplay';

const url="http://localhost:8900/sensor_health";

class Sensor extends Component{
  constructor(){
    super()
    this.state={
      sensor:''
    }
  }

  render(){
    return(
      <div>
        <SensorHealthDisplay sensorData={this.state.sensor}/>
      </div>
    )
  }

  componentDidMount(){
    fetch(url,{method:'GET'})
    .then((response) => response.json())
    //.then((data) =>{console.log(data)})
    .then((data) => {this.setState({sensor:data})})
  }
}


export default Sensor;





