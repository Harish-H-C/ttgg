// import React, { useState, useEffect } from 'react';
// import { Bar } from "react-chartjs-2";
// import axios from "axios";
// import Moment from 'moment';

// const Barchart = (props) => {
//     console.log(props.start)
//     console.log(props.end)
//     const [chartData, setChartData] = useState({});
//     const [deviationData,setDeviationData] = useState({});
//     const [flagVal,setFlagVal] = useState(true)
//     const [start_date,setStartDate] = useState(
//       new Moment().subtract(3,'d').format('YYYY-MM-DD')
//     )
//     const [end_date,setEndDate] = useState(
//       new Moment().add(1,'d').format('YYYY-MM-DD')
//     )
//     if((props.start != start_date) | (props.end != end_date)){
//       setFlagVal(true)
//       setStartDate(props.start)
//       setEndDate(props.end)
//     }
//     // const [employeeSalary, setEmployeeSalary] = useState([]);
//     // const [employeeAge, setEmployeeAge] = useState([]);
  
//     const chart = () => {
//       let numOfMassDone = [];   //y-axis
//       let empNames      = [];   //x-axis 
//       axios
//         .get("http://localhost:8900/datasss")
//         .then(res => {
//           console.log(res);
//           for (const dataObj of res.data) {
//             numOfMassDone.push(parseInt(dataObj.msg_count));//parseInt is used to transfer data only in integer
//             empNames.push((dataObj.ther_id));
//           }
//           setChartData({
//             labels: empNames,
//             // labels: [
//             //   "January","February","March","April","May"
//             // ],
//             datasets: [
//               {
//                 label: "Therapist Loading data",
//                 data: numOfMassDone,
//                 backgroundColor: ["rgba(75, 192, 192, 0.6)","rgba(255,205,86,1)","rgb(255,0,0)","rgb(0,0,255)","rgb(60,179,113)"],
//                 borderWidth: 2
//               }
//             ]
//           });
//         })
//         .catch(err => {
//           console.log(err);
//         });
//       console.log(numOfMassDone, empNames);
//     };
  
//     useEffect(() => {
//       console.log("finally entered")
//         if(flagVal){
//           chart();
//           setFlagVal(false)
//         }
//       }, [chart]);
//     return (
//       <div className="App">
//         <div>
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               title: { text: "THICCNESS SCALE", display: true },

//               // maintainAspectRatio: false,
//               layout: {
//                 padding: {
//                     top: 60,
//                     left: 10,
//                     right: 15,
//                      bottom: 15
//                 }
//               },

//             scales: {
//               yAxes: [
//                 {
//                   scaleLabel: {
//                     display: true,
//                     labelString: "Probability",
//                   },
//                 },
//               ],
//               xAxes: [
//                 {
//                   scaleLabel: {
//                     display: true,
//                     labelString: "Therapist ID Numbers",
//                     text:'variables',
//                   },
//                 },
//               ],
//             },
              
//               onClick: (event, elements) => {
//                 const chart = elements[0]._chart
//                 const element = chart.getElementAtEvent(event)[0];
//                 const xLabel = chart.data.labels[element._index];
//                 console.log(xLabel);

//                 // const dataset = chart.data.datasets[element._datasetIndex];
//                 // const value = dataset.data[element._index];
//                 // console.log(dataset.backgroundColor[0] + " at " + xLabel + ": " + value);


//                 // if (xLabel === "MH6534"){
//                 //   window.location.replace('/detail/thid')
//                 // }
//                 // else if (xLabel === "MH7939" ){
//                 //   window.location.replace('/detail/thid')
//                 // }
                
                
//               }
//             }}
//           />
//         </div>
//       </div>
//     );
//   };
//   export default  Barchart;



import React, { useState, useEffect } from 'react';
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Moment from 'moment';

const Barchart = (props) => {
  console.log("ur dates in barcart")
    console.log(props.start)
    console.log(props.end)
    const [chartData, setChartData] = useState({});
    // const [dataAvailable,setDataAvailable] = useState(false)
    const [dataAvaility,setDataAvaility] = useState(true)
    const [flagVal,setFlagVal] = useState(true)
    const [start_date,setStartDate] = useState(
      new Moment().subtract(3,'d').format('YYYY-MM-DD')
    )
    const [end_date,setEndDate] = useState(
      new Moment().add(1,'d').format('YYYY-MM-DD')
    )
    if((props.start != start_date) | (props.end != end_date)){
      console.log("yes in and condition")
      setFlagVal(true)
      setStartDate(props.start)
      setEndDate(props.end)
    }
    // const [employeeSalary, setEmployeeSalary] = useState([]);
    // const [employeeAge, setEmployeeAge] = useState([]);
  
    const chart = () => {
      let datais= []
      let numOfMassDone = [];   //y-axis
      let empNames      = [];   //x-axis 
      axios
        .get("http://localhost:8900/tables")
        .then(res => {
          var endDateis = new Date(end_date);
          var day = 60 * 60 * 24 * 1000;
          var endDate = new Date(endDateis.getTime() + day);
          function convert(str) {
              var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
              return [date.getFullYear(), mnth, day].join("-");
            }
          var endDate = convert(endDate)

          const dataValues = res.data.filter( dataValues => dataValues.Service_Start >= start_date && dataValues.Service_Start <= endDate).map((dataValues,index) => {
            // console.log("enters here")
            // console.log(dataValues.Service_Start)
            return dataValues
          })
          if(dataValues.length === 0){
            setDataAvaility(false)
            // console.log("yes its empty")
          }
          else{
            setDataAvaility(true)
            // console.log("not empty")
          }
          for (const dataObj of dataValues) {
              datais.push((dataObj.ther_id));
          }
          const map = datais.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
          // console.info([...map.keys()])
          empNames.push(...map.keys());
          numOfMassDone.push(...map.values())
          // console.info([...map.values()])
          // console.info([...map.entries()])
 
          setChartData({
            labels: empNames,
            // labels: [
            //   "January","February","March","April","May"
            // ],
            datasets: [
              {
                label: "Therapist v/s Services",
                data: numOfMassDone,
                backgroundColor: ["rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)","rgba(75, 192, 192, 0.6)"],
                borderWidth: 2
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
      //console.log(numOfMassDone, empNames);
    };
  
    useEffect(() => {
      // console.log("finally entered")
        if(flagVal){
          chart();
          setFlagVal(false)
        }
      }, [chart]);
      // console.log("ur chart data below")
      // console.log(chartData.labels)
    return (
      <div className="App">
        <div style={{width:"100%",marginTop:"-6%"}}>
          {
            dataAvaility?
            <Bar
            data={chartData}
            options={{
              scales: {
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: "Number of Services",
                  },
                    ticks: {
                      beginAtZero: true,
                    }
                }],
                xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: "Therapist Nr",
                    text:'variables',
                  },
                },
              ],
            },
              responsive: true,
              title: { text: "", display: true },

              // maintainAspectRatio: false,
              // layout: {
              //   padding: {
              //       left: 10,
              //       right: 15,
              //        bottom: 15
              //   }
              // }, 
              onClick: (event, elements) => {
                const chart = elements[0]._chart
                const element = chart.getElementAtEvent(event)[0];
                const xLabel = chart.data.labels[element._index];
                console.log(xLabel);

                // const dataset = chart.data.datasets[element._datasetIndex];
                // const value = dataset.data[element._index];
                // console.log(dataset.backgroundColor[0] + " at " + xLabel + ": " + value);


                // if (xLabel === "MH6534"){
                //   window.location.replace('/detail/thid')
                // }
                // else if (xLabel === "MH7939" ){
                //   window.location.replace('/detail/thid')
                // }
              }
            }}
          />
          :
          <div>
            <div className="container">
              <div className="jumbotron" style={{marginLeft:"15%",marginBottom:"13%",marginTop:"12%"}}>
              <p style={{fontSize:"25px",fontWeight:"bold"}}>No data found for the selected date range</p>
              </div>
            </div>
          </div>
          
          }
        </div>
      </div>
    );
  };
  export default  Barchart;

