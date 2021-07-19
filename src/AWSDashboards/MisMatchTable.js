import React, { Component } from 'react';
import MisMatchDisplay from './MisMatchDisplay';

// const url="http://localhost:8900/details";
const url="http://192.168.0.101:5000/deviationRep";

class Deviation extends Component{
  constructor(){
    super()
    this.state={
      deviation:''
    }
  }

  render(){
    return(
      <div>
        <MisMatchDisplay userData={this.state.deviation}/>
      </div>
    )
  }

  componentDidMount(){
    fetch(url,{method:'GET'})
    .then((response) => response.json())
    // .then((data) =>{console.log(data)})
    .then((data) => {this.setState({deviation:data})})
  }
}


export default Deviation;

 

