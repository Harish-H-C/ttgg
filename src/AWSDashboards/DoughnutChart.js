import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import Moment from 'moment';

const DoughnutChart = (props) => {
    console.log("ur start date is here")
    console.log(props)
    const [deviationData,setDeviationData] = useState({});
    const [flagVal,setFlagVal] = useState(true)
    const [start_date,setStartDate] = useState(
      new Moment().subtract(3,'d').format('YYYY-MM-DD')
    )
    const [end_date,setEndDate] = useState(
      new Moment().add(1,'d').format('YYYY-MM-DD')
    )
    if((props.start != start_date) | (props.end != end_date)){
      setFlagVal(true)
      setStartDate(props.start)
      setEndDate(props.end)
    }
    const chart = () => {
      console.log("entered chart()")
      let Deviation_data = [];
      let red = 0, orange = 0, yellow = 0;
      axios
      .get("http://192.168.0.101:5000/deviationRep")
      .then(res => {
        // var endDateis = new Date(end_date);
        //     var day = 60 * 60 * 24 * 1000;
        //     var endDate = new Date(endDateis.getTime() + day);
        //     function convert(str) {
        //         var date = new Date(str),
        //           mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        //           day = ("0" + date.getDate()).slice(-2);
        //         return [date.getFullYear(), mnth, day].join("-");
        //       }
        //     var endDate = convert(endDate)
        const largerThanSixty = res.data.filter( dataValues => Moment(dataValues.Service_Start).format('YYYY-MM-DD') >= start_date && Moment(dataValues.Service_Start).format('YYYY-MM-DD') <= end_date).map((dataValues,index) => {
          // console.log("enters here")
          // console.log(dataValues.Service_Start)
          return dataValues
        })
        // console.log("ur largerThan sixty value is: ")
        // console.log(largerThanSixty)
        for (const dataObj of largerThanSixty) {
          // console.log(dataObj)
          if(dataObj.Status === "1"){
            red += 1;
          }
          else if(dataObj.Status === "2"){
            orange += 1;
          }
          else if(dataObj.Status === "3"){
            yellow += 1;
          }
      }
      Deviation_data.push(parseInt(red));
      Deviation_data.push(parseInt(orange));
      Deviation_data.push(parseInt(yellow));
        setDeviationData({
        // labels: [ 'Internet Down',
        //           'Duration Mismatch',
        //           'Appointment Deletion'
        //         ],
            datasets: [
              {
                label: "level of thiccness",
                data: Deviation_data,
                backgroundColor: ["#F44336","orange","#F4EE23"],
                borderWidth: 4
              }
            ],
          });
        })
        .catch(err => {
            console.log(err);
          });
        //console.log(Deviation_data);
    };
      useEffect(() => {
        console.log("finally entered")
        if(flagVal){
          chart();
          setFlagVal(false)
        }
      }, [chart]);
      return (
        <div className="App">
          <div>
            <br/>
            <Doughnut
              width={25}
              height={20}
              data={deviationData}
              options={{
                responsive: true,
                // title: { text: "Appointment Status Chart",display: false,fontSize:20,fontColor:"#0A5979"},
                onClick: (event, elements) => {
                  const chart = elements[0]._chart;
                  const element = chart.getElementAtEvent(event)[0];
                  const xLabel = chart.data.labels[element._index];
                  
                  // const dataset = chart.data.datasets[element._datasetIndex];
                  // const value = dataset.data[element._index];
                  // console.log(dataset.backgroundColor[0] + " at " + xLabel + ": " + value);
                  // if (xLabel === 'Internet Down' ){
                  //   window.location.replace('/appntmismatch')
                  // }
                  // else if (xLabel === 'Duration Mismatch' ){
                  //   window.location.replace('/durmismatch')
                  // }
                  // else if (xLabel === 'Appointment Deletion' ){
                  //   window.location.replace('/notbilled')
                  // }
                }
              }}
            />
          </div>
        </div>
      );
}

export default DoughnutChart;